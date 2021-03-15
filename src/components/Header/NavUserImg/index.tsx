import React from 'react';
import Popover, { PLACEMENT } from '../../Popover/Popover';
import { NavLink, UserDropdowItem, LogoutBtn, ProfileImg, Image } from './styles';
import imgUser from '../../../assets/user.jpg';
import { useAuth } from '../../../hooks/Auth';

const NavUserImg: React.FC = () => {
    const { signOut, user } = useAuth();

    return (
        <>
            <Popover
                content={({ close }: any) => (
                    <UserDropdowItem>
                        {user.isProvider && (
                            <NavLink to="/homeProvider" exact={false} onClick={close}>
                                Dashboard
                            </NavLink>
                        )}
                        {/* <NavLink to={SETTINGS} exact={false} onClick={close}>
                Configurações
            </NavLink> */}
                        <LogoutBtn onClick={signOut}>Sair</LogoutBtn>
                    </UserDropdowItem>
                )}
                accessibilityType="tooltip"
                placement={PLACEMENT.bottomRight}
                overrides={{
                    Body: {
                        style: () => ({
                            width: '220px',
                            zIndex: 2,
                        }),
                    },
                    Inner: {
                        style: {
                            backgroundColor: '#ffffff',
                        },
                    },
                }}
            >
                <ProfileImg>
                    <Image src={imgUser} alt="user" />
                </ProfileImg>
            </Popover>
        </>
    );
};

export default NavUserImg;
