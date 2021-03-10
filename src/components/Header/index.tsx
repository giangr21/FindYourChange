import React from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import { Container, Content, Left, LogoutBtn, ProfileImg, Right, UserDropdowItem, Image, NavLink } from './styles';
import IconButton from '../Button/IconButton';
import { useAuth } from '../../hooks/Auth';
import Popover, { PLACEMENT } from '../Popover/Popover';
import imgUser from '../../assets/user.jpg';

const Index: React.FC = () => {
    const history = useHistory();
    const { isAuthenticated, signOut } = useAuth();

    return (
        <Container>
            <Content>
                <Left
                    onClick={() => {
                        history.push('/');
                    }}
                >
                    <h1>Find Your Change</h1>
                </Left>
                <Right>
                    <Link to="/">Inicio</Link>
                    <Link to="/service">Navegar</Link>
                    <Link to="/about">Sobre nós</Link>
                    {isAuthenticated ? (
                        <Popover
                            content={({ close }: any) => (
                                <UserDropdowItem>
                                    <NavLink to="/home" exact={false} onClick={close}>
                                        Dashboard
                                    </NavLink>
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
                    ) : (
                        <IconButton
                            icon={FaUserAlt}
                            title="Entrar ou Registrar"
                            background="#3A3A3A"
                            action={() => {
                                history.push('/signIn');
                            }}
                        />
                    )}
                </Right>
            </Content>
        </Container>
    );
};

export default Index;
