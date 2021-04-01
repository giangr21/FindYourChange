import React, { useEffect, useState } from 'react';
import Popover, { PLACEMENT } from '../../Popover/Popover';
import { NavLink, UserDropdowItem, LogoutBtn, ProfileImg, Image } from './styles';
import { useAuth } from '../../../hooks/Auth';
import api from '../../../services/api';

const NavUserImg: React.FC = () => {
    const { signOut, user } = useAuth();
    const [avatarImg, setAvatarImg] = useState('');

    useEffect(() => {
        if (user.avatar) {
            // eslint-disable-next-line func-names
            const getImg = async function (): Promise<void> {
                const { data } = await api.get(`storage/base64/min/${user.avatar}`);
                setAvatarImg(data);
            };
            getImg();
        }
    }, [user.avatar]);

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
