import { Toolbar, ToolbarSeparator } from '@proton/components';

import {
    DetailsButton,
    DownloadButton,
    LayoutButton,
    PreviewButton,
    RenameButton,
    ShareFileButton,
    ShareLinkButton,
} from '../ToolbarButtons';
import { StopSharingButton } from './ToolbarButtons';
import { useSharedLinksContent } from './SharedLinksContentProvider';

interface Props {
    shareId: string;
}

const SharedLinksToolbar = ({ shareId }: Props) => {
    const { fileBrowserControls } = useSharedLinksContent();
    const { selectedItems } = fileBrowserControls;

    const renderSelectionActions = () => {
        if (!selectedItems.length) {
            return (
                <>
                    <ShareFileButton shareId={shareId} />
                </>
            );
        }

        return (
            <>
                <PreviewButton shareId={shareId} selectedItems={selectedItems} />
                <DownloadButton shareId={shareId} selectedItems={selectedItems} />
                <ToolbarSeparator />
                <RenameButton shareId={shareId} selectedItems={selectedItems} />
                <DetailsButton shareId={shareId} selectedItems={selectedItems} />
                <ToolbarSeparator />
                <ShareLinkButton shareId={shareId} selectedItems={selectedItems} />
                <StopSharingButton shareId={shareId} selectedItems={selectedItems} />
            </>
        );
    };

    return (
        <Toolbar>
            {renderSelectionActions()}
            <span className="mlauto flex">
                <LayoutButton />
            </span>
        </Toolbar>
    );
};

export default SharedLinksToolbar;
