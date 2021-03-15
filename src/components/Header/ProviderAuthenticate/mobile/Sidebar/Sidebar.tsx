import React from 'react';
import { withRouter } from 'react-router-dom';

// import { DashboardIcon } from 'assets/icons/DashboardIcon';
// import { ProductIcon } from 'assets/icons/ProductIcon';
// import { SidebarCategoryIcon } from 'assets/icons/SidebarCategoryIcon';
// import { OrderIcon } from 'assets/icons/OrderIcon';
// import { CustomerIcon } from 'assets/icons/CustomerIcon';
// import { SettingIcon } from 'assets/icons/SettingIcon';
// import { LogoutIcon } from 'assets/icons/LogoutIcon';
// import { BookIcon } from 'assets/icons/BookIcon';
// import { CouponIcon } from 'assets/icons/CouponIcon';
// import { PencilIcon } from 'assets/icons/PencilIcon';
import { SidebarWrapper, NavLink, MenuWrapper, Svg, LogoutBtn } from './Sidebar.style';
import { useAuth } from '../../../../../hooks/Auth';
import { LogoutIcon } from '../Icons/LogoutIcon';
import { DashboardIcon } from '../Icons/DashboardIcon';

const sidebarMenus = [
    {
        name: 'Dashboard',
        path: '/homeProvider',
        exact: false,
        icon: <DashboardIcon />,
    },
    {
        name: 'Horarios',
        path: '/configSchedulesProvider',
        exact: false,
        icon: <DashboardIcon />,
    },
    {
        name: 'Serviços',
        path: '/configServicesProvider',
        exact: false,
        icon: <DashboardIcon />,
    },
    {
        name: 'Produtos',
        path: '/configProductsProvider',
        exact: false,
        icon: <DashboardIcon />,
    },
    {
        name: 'Atendentes',
        path: '/configClerksProvider',
        exact: false,
        icon: <DashboardIcon />,
    },
    {
        name: 'MarketPlace',
        path: '/marketplace',
        exact: false,
        icon: <DashboardIcon />,
    },
    {
        name: 'Home Sistema',
        path: '/',
        exact: true,
        icon: <DashboardIcon />,
    },
];

export default withRouter(function Sidebar({ refs, style, onMenuItemClick }: any) {
    const { signOut } = useAuth();

    return (
        <SidebarWrapper ref={refs} style={style}>
            <MenuWrapper>
                {sidebarMenus.map((menu: any, index: number) => (
                    <NavLink
                        to={menu.path}
                        key={index}
                        exact={menu.exact}
                        activeStyle={{
                            color: '#ff9000',
                            backgroundColor: '#f7f7f7',
                            borderRadius: '50px 0 0 50px',
                        }}
                        onClick={onMenuItemClick}
                    >
                        {menu.icon ? <Svg>{menu.icon}</Svg> : ''}
                        {menu.name}
                    </NavLink>
                ))}
            </MenuWrapper>

            <LogoutBtn onClick={signOut}>
                <Svg>
                    <LogoutIcon />
                </Svg>
                Sair
            </LogoutBtn>
        </SidebarWrapper>
    );
});