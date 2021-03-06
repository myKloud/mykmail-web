import { LayoutsSection, ThemesSection, AppearanceOtherSection, SettingsPropsShared } from '@proton/components';
import { c } from 'ttag';

import PrivateMainSettingsAreaWithPermissions from '../../components/PrivateMainSettingsAreaWithPermissions';

export const getAppearancePage = () => {
    return {
        text: c('Title').t`Appearance`,
        to: '/mail/appearance',
        icon: 'paint-roller',
        subsections: [
            {
                text: c('Title').t`Theme`,
                id: 'theme',
            },
            {
                text: c('Title').t`Layout`,
                id: 'layout',
            },
            {
                text: c('Title').t`Other`,
                id: 'other',
            },
        ],
    };
};

const MailAppearanceSettings = ({ location }: SettingsPropsShared) => {
    return (
        <PrivateMainSettingsAreaWithPermissions location={location} config={getAppearancePage()}>
            <ThemesSection />
            <LayoutsSection />
            <AppearanceOtherSection />
        </PrivateMainSettingsAreaWithPermissions>
    );
};

export default MailAppearanceSettings;
