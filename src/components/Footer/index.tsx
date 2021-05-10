/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Container, Up, Down, Content, Left, Right } from './styles';
import logo from '../../assets/logoPrincipalMobile.png';
import { useMedia } from '../../util/use-media';

const Index: React.FC = () => {
    const mobile = useMedia('(max-width: 990px)');

    return (
        <Container>
            <Content>
                <Up mobile={mobile}>
                    <Link to="/">Início</Link>
                    <Link to="/allServicesProvider">Navegar</Link>
                    <Link to="/about">Sobre Nós</Link>
                    <Link to="/homeProvider">Dashboard</Link>
                </Up>
                <div
                    style={{
                        height: '1px',
                        backgroundColor: '#ff9000',
                        width: '100%',
                        margin: '10px 0px',
                    }}
                />
                <Down>
                    <Left mobile={mobile}>
                        <img src={logo} alt="" />
                        <p>2021 Find Your Change - Todos os direitos reservados</p>
                    </Left>
                    <Right mobile={mobile}>
                        <div className="img">
                            <label htmlFor="avatar">
                                <FaInstagram />
                            </label>
                        </div>
                        <div className="img">
                            <label htmlFor="avatar">
                                <FaWhatsapp />
                            </label>
                        </div>
                        <div className="img">
                            <label htmlFor="avatar">
                                <FaFacebookF />
                            </label>
                        </div>
                    </Right>
                </Down>
            </Content>
        </Container>
    );
};

export default Index;
