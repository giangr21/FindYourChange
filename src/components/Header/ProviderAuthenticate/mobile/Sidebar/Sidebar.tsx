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

const sidebarMenus = [
    {
        name: 'Dashboard',
        path: '/',
        exact: true,
        // icon: <DashboardIcon />,
    },
    // {
    //     name: 'Produtos',
    //     path: PRODUCTS,
    //     exact: false,
    //     icon: <ProductIcon />,
    // },
    // {
    //     name: 'Categorias',
    //     path: CATEGORY,
    //     exact: false,
    //     icon: <SidebarCategoryIcon />,
    // },
    // {
    //     name: 'Pedidos',
    //     path: ORDERS,
    //     exact: false,
    //     icon: <OrderIcon />,
    // },
    // {
    //     name: 'Banners',
    //     path: BANNERS,
    //     exact: false,
    //     icon: <PencilIcon />,
    // },
    // {
    //     name: 'Clientes',
    //     path: CLIENTS,
    //     exact: false,
    //     icon: <BookIcon />,
    // },
    // {
    //     name: 'Funcionários',
    //     path: STAFF_MEMBERS,
    //     exact: false,
    //     icon: <CustomerIcon />,
    // },
    // {
    //     name: 'Cupons',
    //     path: COUPONS,
    //     exact: false,
    //     icon: <CouponIcon />,
    // },
    // {
    //     name: 'Configurações ',
    //     path: SETTINGS,
    //     exact: false,
    //     icon: <SettingIcon />,
    // },
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
                            color: '#00C58D',
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
                <Svg>{/* <LogoutIcon /> */}</Svg>
                Sair
            </LogoutBtn>
        </SidebarWrapper>
    );
});
