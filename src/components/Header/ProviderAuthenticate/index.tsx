import React from 'react';
import { FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Header, HeaderContent, Profile } from './styles';
import { useAuth } from '../../../hooks/Auth';

const Index: React.FC = () => {
    const { signOut } = useAuth();

    return (
        <Header>
            <HeaderContent>
                <div className="links">
                    <Link to="/marketplace">MarketPlace</Link>
                    <Link to="/configProvider">Produtos</Link>
                    <Link to="/configProvider">Serviços</Link>
                    <Link to="/configProvider">Horarios</Link>
                    <Link to="/configProvider">Navegar</Link>
                </div>
                <Profile>
                    <img src="https://pickaface.net/gallery/avatar/20140501_004912_2217_comm.png" alt="asd" />
                    <div>
                        <span>Bem-vindo,</span>
                        <Link to="/profile">
                            Usuario
                            {/* <strong>{user.name}</strong> */}
                        </Link>
                    </div>
                </Profile>
                <button onClick={signOut} type="button">
                    <FiPower />
                </button>
            </HeaderContent>
        </Header>
    );
};

export default Index;
