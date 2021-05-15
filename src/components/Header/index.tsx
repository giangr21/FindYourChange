import React from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Container, Content, Left, Right } from './styles';
import IconButton from '../FormComponents/Button/IconButton';
import { useAuth } from '../../hooks/authentication';
import NavUserImg from './NavUserImg';
import logo from '../../assets/logoFindYourChange.png';
import { useMedia } from '../../util/use-media';

const Index: React.FC = () => {
    const history = useHistory();
    const location = useLocation();
    const { isAuthenticated } = useAuth();
    const mobile = useMedia('(max-width: 990px)');

    return (
        <Container hideBackgroundColor={!(location.pathname === '/' && mobile)}>
            <Content hideBackgroundColor={!(location.pathname === '/' && mobile)}>
                <Left
                    onClick={() => {
                        history.push('/');
                    }}
                >
                    <img src={logo} alt="logo" />
                </Left>
                <Right>
                    {!mobile && (
                        <>
                            <Link to="/">Início</Link>
                            <Link to="/allServicesProvider">Estabelecimentos</Link>
                            <Link to="/about">Sobre nós</Link>
                        </>
                    )}
                    {isAuthenticated ? (
                        <NavUserImg />
                    ) : (
                        <IconButton
                            icon={FaUserAlt}
                            title={mobile ? '' : 'Entrar ou Registrar'}
                            justIcon={!!mobile}
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
