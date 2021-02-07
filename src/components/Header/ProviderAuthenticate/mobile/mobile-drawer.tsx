/* eslint-disable react/jsx-wrap-multilines */
import React, { useContext, useState } from 'react';
import { Scrollbar } from '../../../Scrollbar/scrollbar';
import Drawer from '../../../Drawer/drawer';
// import { Button } from 'components/button/button';
// import NavLink from 'components/nav-link/nav-link';
// import { CloseIcon } from 'assets/icons/CloseIcon';
import {
    DrawerBody,
    HamburgerIcon,
    DrawerContentWrapper,
    DrawerClose,
    DrawerProfile,
    LogoutView,
    LoginView,
    UserAvatar,
    UserDetails,
    DrawerMenu,
    DrawerMenuItem,
    UserOptionMenu,
} from './header.style';
import NavLink from '../../../NavLink/nav-link';

const MobileDrawer: React.FunctionComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [menuItems, setMenuItems] = useState([
        {
            id: 'Home',
            href: '/',
        },
        {
            id: 'Perfil',
            href: '/profile',
        },
        {
            id: 'Pedidos',
            href: '/order',
        },
        {
            id: 'Termos',
            href: '/terms',
        },
    ]);

    // const isDrawerOpen = useAppState('isDrawerOpen');
    // const dispatch = useAppDispatch();

    // Toggle drawer
    const toggleHandler = React.useCallback(() => {
        // dispatch({
        //     type: 'TOGGLE_DRAWER',
        // });
    }, []);

    const handleLogout = (): void => {
        if (typeof window !== 'undefined') {
            // Router.push('/');
            setTimeout(() => {
                // authDispatch({ type: 'SIGN_OUT' });
                localStorage.removeItem('@ecommerce:token');
                localStorage.removeItem('@ecommerce:user');
                toggleHandler();
            }, 500);
        }
    };

    const signInOutForm = (): void => {
        // dispatch({
        //     type: 'TOGGLE_DRAWER',
        // });
        // authDispatch({
        //     type: 'SIGNIN',
        // });
        // openModal({
        //     show: true,
        //     overlayClassName: 'quick-view-overlay',
        //     closeOnClickOutside: true,
        //     component: AuthenticationForm,
        //     closeComponent: '',
        //     config: {
        //         enableResizing: false,
        //         disableDragging: true,
        //         className: 'quick-view-modal',
        //         width: 458,
        //         height: 'auto',
        //     },
        // });
    };

    return (
        <Drawer
            width="316px"
            drawerHandler={
                <HamburgerIcon>
                    <span />
                    <span />
                    <span />
                </HamburgerIcon>
            }
            open={isOpen}
            toggleHandler={() => setIsOpen((prevState) => !prevState)}
            closeButton={
                <DrawerClose>
                    close
                    {/* <CloseIcon /> */}
                </DrawerClose>
            }
        >
            <DrawerBody>
                <Scrollbar className="drawer-scrollbar">
                    <DrawerContentWrapper>
                        {/* <DrawerProfile>
                            {isAuthenticated ? (
                                <LoginView>
                                    <UserAvatar>
                                        <img src={user && user.img ? user.img : UserImage} alt="user_avatar" />
                                    </UserAvatar>
                                    <UserDetails>
                                        <h3>{user && user.name}</h3>
                                    </UserDetails>
                                </LoginView>
                            ) : (
                                <LogoutView>
                                    <Button variant="primary" onClick={signInOutForm}>
                                        <span>Login / Cadastro</span>
                                    </Button>
                                </LogoutView>
                            )}
                        </DrawerProfile>

                        {isAuthenticated ? (
                            <UserOptionMenu>
                                <DrawerMenuItem>
                                    {menuItems.map((item, idx) => (
                                        <NavLink
                                            onClick={toggleHandler}
                                            key={idx}
                                            className="drawer_menu_item"
                                            href={item.href}
                                            label={item.id}
                                        />
                                    ))}
                                </DrawerMenuItem>
                                <DrawerMenuItem>
                                    <div onClick={handleLogout} className="drawer_menu_item">
                                        <span className="logoutBtn">
                                            <FormattedMessage id="navlinkLogout" defaultMessage="Logout" />
                                        </span>
                                    </div>
                                </DrawerMenuItem>
                            </UserOptionMenu>
                        ) : (
                            <DrawerMenu>
                                <DrawerMenuItem>
                                    <NavLink
                                        onClick={toggleHandler}
                                        href="/"
                                        label="Home"
                                        className="drawer_menu_item"
                                    />
                                </DrawerMenuItem>
                            </DrawerMenu>
                        )} */}
                        <DrawerMenu>
                            <DrawerMenuItem>
                                <NavLink
                                    onClick={toggleHandler}
                                    href="/"
                                    label="Home"
                                    className="drawer_menu_item"
                                />
                            </DrawerMenuItem>
                            <DrawerMenuItem>
                                <NavLink
                                    onClick={toggleHandler}
                                    href="/"
                                    label="Home"
                                    className="drawer_menu_item"
                                />
                            </DrawerMenuItem>
                            <DrawerMenuItem>
                                <NavLink
                                    onClick={toggleHandler}
                                    href="/"
                                    label="Home"
                                    className="drawer_menu_item"
                                />
                            </DrawerMenuItem>
                            <DrawerMenuItem>
                                <NavLink
                                    onClick={toggleHandler}
                                    href="/"
                                    label="Home"
                                    className="drawer_menu_item"
                                />
                            </DrawerMenuItem>
                        </DrawerMenu>
                    </DrawerContentWrapper>
                </Scrollbar>
            </DrawerBody>
        </Drawer>
    );
};

export default MobileDrawer;
