import React, { useState } from 'react';
import Drawer, { ANCHOR } from '../../../Drawer/Drawer';
import logo from '../../../../assets/logoPrincipalMobile.png';

import { DrawerWrapper, DrawerIcon, CloseButton, TopbarWrapper } from './styles';
import Logo from '../../../Logo/logo';
import { MenuIcon } from './Icons/MenuIcon';
import { ArrowLeftRound } from './Icons/ArrowLeftRound';
import Sidebar from './Sidebar/Sidebar';
import NavUserImg from '../../NavUserImg';

const MobileHeader: React.FC = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        // <MobileHeaderWrapper>
        //     <MobileHeaderInnerWrapper className={className}>
        //         <DrawerWrapper>
        //             <MobileDrawer />
        //         </DrawerWrapper>

        //         <LogoWrapper>
        //             <Logo imageUrl={logo} alt="shop logo" />
        //         </LogoWrapper>

        //         <SearchWrapper onClick={() => {}} className="searchIconWrapper">
        //             <FiSearch color="#ff9000" />
        //         </SearchWrapper>
        //     </MobileHeaderInnerWrapper>
        // </MobileHeaderWrapper>
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
                                zIndex: '1',
                            },
                        },
                        DrawerBody: {
                            style: {
                                marginRight: '0',
                                marginLeft: '0',
                                '@media only screen and (max-width: 767px)': {
                                    marginLeft: '30px',
                                },
                            },
                        },
                        DrawerContainer: {
                            style: {
                                width: '270px',
                                '@media only screen and (max-width: 767px)': {
                                    width: '80%',
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
