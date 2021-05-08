import React, { useEffect, useState } from 'react';
import { FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Header, HeaderContent, Profile } from './styles';
import { useAuth } from '../../../hooks/auth';
import api from '../../../services/api';

const Index: React.FC = () => {
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
        <Header>
            <HeaderContent>
                <div className="links">
                    <Link to="/homeProvider">Dashboard</Link>
                    {/* <Link to="/appointmentsProvider">Agendamentos</Link> */}
                    <Link to="/configSchedulesProvider">Horários</Link>
                    <Link to="/configServicesProvider">Serviços</Link>
                    <Link to="/configProductsProvider">Produtos</Link>
                    <Link to="/configClerksProvider">Atendentes</Link>
                    <Link to="/marketplace">MarketPlace</Link>
                    <Link to="/">Home</Link>
                </div>
                <Profile>
                    <img src={`data:image/png;base64,${avatarImg}`} alt="asd" />
                    <div>
                        <span>Bem-vindo, {user.name}</span>
                        <Link to="/providerProfile">
                            <strong>Editar perfil</strong>
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
