import React from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import { Container, Content, Left, Right } from './styles';
import IconButton from '../Button/IconButton';

const Index: React.FC = () => {
    const history = useHistory();

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
                    <IconButton
                        icon={FaUserAlt}
                        title="Entrar ou Registrar"
                        background="#3A3A3A"
                        action={() => {
                            history.push('/signIn');
                        }}
                    />
                </Right>
            </Content>
        </Container>
    );
};

export default Index;
