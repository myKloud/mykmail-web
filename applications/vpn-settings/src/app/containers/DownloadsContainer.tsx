import { c } from 'ttag';
import { ProtonVPNClientsSection, OpenVPNConfigurationSection, SettingsPropsShared } from '@proton/components';

import PrivateMainSettingsAreaWithPermissions from '../components/page/PrivateMainSettingsAreaWithPermissions';

export const getDownloadsPage = () => {
    return {
        text: c('Title').t`Downloads`,
        to: '/downloads',
        icon: 'arrow-down-to-rectangle',
        subsections: [
            {
                text: c('Title').t`ProtonVPN clients`,
                id: 'protonvpn-clients',
            },
            {
                text: c('Title').t`OpenVPN configuration files`,
                id: 'openvpn-configuration-files',
            },
        ],
    };
};

const DownloadsContainer = ({ setActiveSection, location }: SettingsPropsShared) => {
    return (
        <PrivateMainSettingsAreaWithPermissions
            location={location}
            config={getDownloadsPage()}
            setActiveSection={setActiveSection}
        >
            <ProtonVPNClientsSection />
            <OpenVPNConfigurationSection />
        </PrivateMainSettingsAreaWithPermissions>
    );
};

export default DownloadsContainer;
