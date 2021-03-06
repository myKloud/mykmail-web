#!/usr/bin/env node
const fs = require('fs').promises;
const execa = require('execa');
const path = require('path');
const { Command } = require('commander');
const portfinder = require('portfinder');

const program = new Command();

const { getConfigData, getApi, getConfigFile } = require('../lib/config');

const getPort = (basePort) => {
    portfinder.basePort = basePort;
    return portfinder.getPortPromise();
};

const writeConfig = async (configFile) => {
    const configPath = path.resolve('./src/app/config.ts');
    await fs.writeFile(configPath, configFile);
};

const addGlobalOptions = (program) => {
    return program
        .option('--appMode <appMode>', '')
        .option('--featureFlags <featureFlags>', '')
        .option(
            '--publicPath <publicPath>',
            '',
            (publicPath) => {
                if (publicPath && (!publicPath.startsWith('/') || !publicPath.endsWith('/'))) {
                    throw new Error('--publicPath must start and end with a forward slash');
                }
                return publicPath || '/';
            },
            '/'
        );
};

const getWebpackArgs = (options, env, { appData, buildData }) => {
    const envArgs = {
        api: appData.api === '/api' ? undefined : appData.api,
        appMode: options.appMode,
        publicPath: options.publicPath === '/' ? undefined : options.publicPath,
        featureFlags: options.featureFlags,
        writeSri: options.sri ? undefined : options.sri,
        ...buildData,
    };
    const extraWebpackArgs = env.args.join(' ');
    const webpackEnvArgs = Object.entries(envArgs)
        .filter(([, value]) => value !== undefined && value !== '')
        .reduce((acc, [key, value]) => {
            return `${acc} --env ${key}=${value.replace(/ /g, '\\ ')}`;
        }, '');

    return `${webpackEnvArgs} ${extraWebpackArgs}`;
};

const commandWithLog = (...args) => {
    console.log(args[0]);
    return execa.command(...args);
};

addGlobalOptions(program.command('build').description('create an optimized production build'))
    .option('--no-sri', 'disable sri')
    .action(async (options, env) => {
        const configData = getConfigData(options);
        await writeConfig(getConfigFile(configData));

        const webpackArgs = getWebpackArgs(options, env, configData);
        const outputPath = path.resolve('./dist');
        await commandWithLog(`rm -rf ${outputPath}`);
        await commandWithLog(
            `${require.resolve('webpack-cli/bin/cli.js')} --progress --output-path=${outputPath} ${webpackArgs}`,
            {
                stdio: 'inherit',
            }
        );
        await commandWithLog(`${path.resolve(__dirname, `../scripts/validate.sh`)} ${outputPath}`, {
            stdio: 'inherit',
        });
    });

addGlobalOptions(program.command('dev-server').description('run locally'))
    .option('--port <port>', '')
    .option(
        '--api <api>',
        '',
        (api) => {
            return getApi(api);
        },
        getApi('')
    )
    .action(async (options, env) => {
        const configData = getConfigData(options);
        await writeConfig(getConfigFile(configData));

        const port = await getPort(options.port || 8080);

        const webpackArgs = getWebpackArgs(options, env, configData);
        await commandWithLog(
            `${require.resolve('webpack-cli/bin/cli.js')} serve --progress --port=${port} ${webpackArgs}`,
            {
                stdio: 'inherit',
            }
        );
    });

addGlobalOptions(program.command('config').description('write config')).action(async (options) => {
    await writeConfig(getConfigFile(getConfigData(options)));
});

program.parse(process.argv);
