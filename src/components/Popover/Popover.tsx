import * as React from 'react';
import { StatefulPopover, PLACEMENT, TRIGGER_TYPE } from 'baseui/popover';

const Popover = ({ children, ...props }: any): any => {
    return <StatefulPopover {...props}>{children}</StatefulPopover>;
};

export { PLACEMENT, TRIGGER_TYPE };
export default Popover;
