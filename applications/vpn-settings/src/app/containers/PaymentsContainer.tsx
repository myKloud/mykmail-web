import { InvoicesSection, PaymentMethodsSection, SettingsPropsShared } from '@proton/components';
import { PERMISSIONS } from '@proton/shared/lib/constants';
import { c } from 'ttag';

import PrivateMainSettingsAreaWithPermissions from '../components/page/PrivateMainSettingsAreaWithPermissions';

const { UPGRADER } = PERMISSIONS;

export const getPaymentsPage = () => {
    return {
        text: c('Title').t`Payments`,
        to: '/payments',
        icon: 'wallet',
        permissions: [UPGRADER],
        subsections: [
            {
                text: c('Title').t`Payment methods`,
                id: 'payment-methods',
            },
            {
                text: c('Title').t`Invoices`,
                id: 'invoices',
            },
        ],
    };
};
const PaymentsContainer = ({ setActiveSection, location }: SettingsPropsShared) => {
    return (
        <PrivateMainSettingsAreaWithPermissions
            location={location}
            config={getPaymentsPage()}
            setActiveSection={setActiveSection}
        >
            <PaymentMethodsSection />
            <InvoicesSection />
        </PrivateMainSettingsAreaWithPermissions>
    );
};

export default PaymentsContainer;
