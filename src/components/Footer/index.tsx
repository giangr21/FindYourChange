/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Container, Up, Down, Content, Left, Right } from './styles';
import logo from '../../assets/logoPrincipalMobile.png';

const Index: React.FC = () => {
    return (
        <Container>
            <Content>
                <Up>
                    <Link to="/home">Inicio</Link>
                    <Link to="/home">Navegar</Link>
                    <Link to="/home">Sobre Nos</Link>
                    <Link to="/home">Dashboard</Link>
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
                    <Left>
                        <img src={logo} alt="" />
                        <p>2021 Find Your Change - Todos os direitos reservados</p>
                    </Left>
                    <Right>
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
