import React, { useState } from 'react';
import Drawer, { ANCHOR } from '../../../Drawer';
import { DrawerWrapper, DrawerIcon, CloseButton, TopbarWrapper } from './styles';
import { MenuIcon } from './Icons/iconMenu';
import { ArrowLeftRound } from './Icons/iconArrowLeft';
import Sidebar from './Sidebar';
import NavUserImg from '../../NavUserImg';

const MobileHeader: React.FC = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <TopbarWrapper>
            <DrawerWrapper>
                <DrawerIcon onClick={() => setIsDrawerOpen(true)}>
                    <MenuIcon />
                </DrawerIcon>
                <Drawer
                    isOpen={isDrawerOpen}
                    anchor={ANCHOR.left}
                    onClose={() => setIsDrawerOpen(false)}
                    overrides={{
                        Root: {
                            style: {
                                zIndex: '10',
                            },
                        },
                        DrawerBody: {
                            style: {
                                marginRight: '0',
                                marginLeft: '0',
                                '@media only screen and (max-width: 989px)': {
                                    marginLeft: '15px',
                                    marginRight: '15px',
                                },
                            },
                        },
                        DrawerContainer: {
                            style: {
                                width: '270px',
                                '@media only screen and (max-width: 989px)': {
                                    width: '75%',
                                },
                            },
                        },
                        Close: {
                            component: () => (
                                <CloseButton onClick={() => setIsDrawerOpen(false)}>
                                    <ArrowLeftRound />
                                </CloseButton>
                            ),
                        },
                    }}
                >
                    <Sidebar onMenuItemClick={() => setIsDrawerOpen(false)} />
                </Drawer>
            </DrawerWrapper>

            <NavUserImg />
        </TopbarWrapper>
    );
};

export default MobileHeader;
