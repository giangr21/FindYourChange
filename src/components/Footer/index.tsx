/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Container, Content, Left, Right } from './styles';
import logo from '../../assets/logoFYC.png';

const Index: React.FC = () => {
    return (
        <Container>
            <Content>
                <Left>
                    <img src={logo} alt="" />
                    <p>2020 Find Your Change - Todos os direitos reservados</p>
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
            </Content>
        </Container>
    );
};

export default Index;
