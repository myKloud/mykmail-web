import { c } from 'ttag';
import { Recipient } from '@proton/shared/lib/interfaces';
import { Tooltip } from '@proton/components';
import { OpenPGPKey } from 'pmcrypto';

import { MapStatusIcons, StatusIcon } from '../../../models/crypto';
import { RecipientOrGroup } from '../../../models/address';

import RecipientItemLayout from './RecipientItemLayout';
import RecipientItemGroup from './RecipientItemGroup';
import RecipientItemSingle from './RecipientItemSingle';

interface Props {
    recipientOrGroup: RecipientOrGroup;
    mapStatusIcons?: MapStatusIcons;
    globalIcon?: StatusIcon;
    showAddress?: boolean;
    showLockIcon?: boolean;
    isLoading: boolean;
    signingPublicKey?: OpenPGPKey;
    highlightKeywords?: boolean;
}

const RecipientItem = ({
    recipientOrGroup,
    mapStatusIcons,
    globalIcon,
    showAddress = true,
    showLockIcon = true,
    isLoading,
    signingPublicKey,
    highlightKeywords = false,
}: Props) => {
    if (isLoading) {
        return (
            <RecipientItemLayout
                isLoading
                button={
                    <span className="message-recipient-item-icon item-icon flex-item-noshrink rounded block mr0-5" />
                }
                showAddress={showAddress}
            />
        );
    }

    if (recipientOrGroup.group) {
        return (
            <RecipientItemGroup
                group={recipientOrGroup.group}
                mapStatusIcons={mapStatusIcons}
                globalIcon={globalIcon}
                showAddress={showAddress}
                highlightKeywords={highlightKeywords}
            />
        );
    }

    if (recipientOrGroup.recipient) {
        return (
            <RecipientItemSingle
                recipient={recipientOrGroup.recipient as Recipient}
                mapStatusIcons={mapStatusIcons}
                globalIcon={globalIcon}
                showAddress={showAddress}
                showLockIcon={showLockIcon}
                signingPublicKey={signingPublicKey}
                highlightKeywords={highlightKeywords}
            />
        );
    }

    // Undisclosed Recipient
    return (
        <RecipientItemLayout
            button={
                <Tooltip title={c('Title').t`All recipients were added to the BCC field and cannot be disclosed`}>
                    <span className="message-recipient-item-icon item-icon flex-item-noshrink rounded block mr0-5 flex flex-justify-center flex-align-items-center">
                        ?
                    </span>
                </Tooltip>
            }
            label={c('Label').t`Undisclosed Recipients`}
            title={c('Label').t`Undisclosed Recipients`}
        />
    );
};

export default RecipientItem;
