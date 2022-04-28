import React from 'react';
import { Drawer, SIZE, ANCHOR } from 'baseui/drawer';

const BWDrawer = ({ children, ...props }: any): any => {
    return <Drawer {...props}>{children}</Drawer>;
};

export { SIZE, ANCHOR };
export default BWDrawer;
