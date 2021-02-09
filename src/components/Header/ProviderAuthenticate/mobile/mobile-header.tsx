import React from 'react';
import logo from '../../../../assets/logoPrincipalMobile.png';

import {
    MobileHeaderWrapper,
    MobileHeaderInnerWrapper,
    DrawerWrapper,
    LogoWrapper,
    SearchWrapper,
    SearchModalWrapper,
    SearchModalClose,
} from './header.style';
import MobileDrawer from './mobile-drawer';
import Logo from '../../../Logo/logo';
import { FiSearch } from 'react-icons/fi';

type MobileHeaderProps = {
    className?: string;
    closeSearch?: any;
};

const MobileHeader: React.FC<MobileHeaderProps> = ({ className }) => {



    return (
        <MobileHeaderWrapper>
            <MobileHeaderInnerWrapper className={className}>
                <DrawerWrapper>
                    <MobileDrawer />
                </DrawerWrapper>

                <LogoWrapper>
                    <Logo imageUrl={logo} alt="shop logo" />
                </LogoWrapper>

                <SearchWrapper onClick={() => {}} className="searchIconWrapper">
                    <FiSearch color="#ff9000" />
                </SearchWrapper>
            </MobileHeaderInnerWrapper>
        </MobileHeaderWrapper>
    );
};

export default MobileHeader;
