import { ReactNode } from 'react';
import { classnames } from '../../helpers';

import {Header, Footer} from "../../components/mykloud"

interface Props {
    children?: ReactNode;
    className?: string;
    heightClassName?: string;
}

const ProminentContainer = ({ children, heightClassName, className }: Props) => {
    // Because of Safari issue, the height must be specified in percentage
    // by default for normal pages. But if the page has height 100%, it creates
    // ugly empty bar on mobiles due to address bar (the height is calculated
    // with the bar visible and once user hides the address bar, suddenly
    // the view is bigger with empty space after that bar). So pages like that
    // should set h100v class for height instead.
    return (
        <div
            className={classnames([
                'ui-prominent bg-norm color-norm mykloud-login-container',
                heightClassName || 'h100',
                className,
            ])}
        >
            <Header />
            <div className="form-container">{children}</div>
            <Footer />
        </div>
    );
};

export default ProminentContainer;
