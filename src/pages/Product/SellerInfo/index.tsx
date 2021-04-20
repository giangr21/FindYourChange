import React from 'react';

import {
    Container,
    Title,
    LocationCard,
    LocationIcon,
    ReputationCard,
    ReputationThermometer,
    ReputationRow,
    SupportIcon,
    UserIcon,
    ClockIcon,
    More,
} from './styles';

interface SellerInfoProps {
    sellerInfo: any;
}

const SellerInfo: React.FC<SellerInfoProps> = ({ sellerInfo, children }) => {
    return (
        <Container>
            <Title>Informações sobre o vendedor</Title>

            <LocationCard>
                <UserIcon />

                <div>
                    <p>Contato </p>
                    <strong>
                        {sellerInfo.legalName} - {sellerInfo.phone}
                    </strong>
                </div>
            </LocationCard>
            <LocationCard>
                <LocationIcon />

                <div>
                    <p>Localização </p>
                    <strong>
                        {sellerInfo.addressCity} - {sellerInfo.addressState}
                    </strong>
                </div>
            </LocationCard>

            <ReputationCard>
                <ReputationThermometer>
                    <li />
                    <li />
                    <li />
                    <li />
                    <li className="active" />
                </ReputationThermometer>

                <ReputationRow>
                    <div>
                        <strong>10</strong>
                        <span>vendas nos últimos 4 meses</span>
                    </div>
                    <div>
                        <strong>
                            <SupportIcon />
                        </strong>
                        <span>Presta um bom atendimento</span>
                    </div>
                    <div>
                        <strong>
                            <ClockIcon />
                        </strong>
                        <span>Entrega os produtos dentro do prazo</span>
                    </div>
                </ReputationRow>
            </ReputationCard>
        </Container>
    );
};

export default SellerInfo;
