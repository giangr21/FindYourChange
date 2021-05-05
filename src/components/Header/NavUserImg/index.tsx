import React, { useEffect, useState } from 'react';
import Popover, { PLACEMENT } from '../../Popover/Popover';
import { NavLink, UserDropdowItem, LogoutBtn, ProfileImg, Image } from './styles';
import { useAuth } from '../../../hooks/Auth';
import api from '../../../services/api';
import { useMedia } from '../../../util/use-media';

const NavUserImg: React.FC = () => {
    const { signOut, user } = useAuth();
    const mobile = useMedia('(max-width: 990px)');
    const [avatarImg, setAvatarImg] = useState('');

    useEffect(() => {
        // eslint-disable-next-line func-names
        const getImg = async function (): Promise<void> {
            const { data } = await api.get(`storage/base64/min/${user.avatar}`);
            setAvatarImg(data);
        };
        getImg();
    }, [user.avatar]);

    return (
        <>
            <Popover
                content={({ close }: any) => (
                    <UserDropdowItem>
                        {mobile && (
                            <>
                                <NavLink to="/" exact={false} onClick={close}>
                                    Início
                                </NavLink>
                                <NavLink to="/allServicesProvider" exact={false} onClick={close}>
                                    Navegar
                                </NavLink>
                                <NavLink to="/about" exact={false} onClick={close}>
                                    Sobre nós
                                </NavLink>
                            </>
                        )}
                        {user.isProvider && (
                            <NavLink to="/homeProvider" exact={false} onClick={close}>
                                Dashboard
                            </NavLink>
                        )}
                        {!user.isProvider && (
                            <NavLink to="/userProfile" exact={false} onClick={close}>
                                Editar Conta
                            </NavLink>
                        )}

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
                    <Image src={`data:image/png;base64,${avatarImg}`} alt="user" />
                </ProfileImg>
            </Popover>
        </>
    );
};

export default NavUserImg;
