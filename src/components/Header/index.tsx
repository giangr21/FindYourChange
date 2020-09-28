import React from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import { Container, Left, Right } from './styles';
import IconButton from '../Button/IconButton';

const Index: React.FC = () => {
    const history = useHistory();

    return (
        <Container>
            <h1>Find Your Change</h1>
            <Right>
                <Link to="/">Inicio</Link>
                <Link to="/">Navegar</Link>
                <IconButton
                    icon={FaUserAlt}
                    title="Entrar ou Registrar"
                    background="#3A3A3A"
                    action={() => {
                        history.push('/signIn');
                    }}
                />
            </Right>
        </Container>
    );
};

export default Index;
