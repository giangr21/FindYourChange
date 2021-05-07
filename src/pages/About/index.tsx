import React, { useRef } from 'react';
import { FaArrowRight, FaSearch } from 'react-icons/fa';

import { Container, ImageContainer, Title, SubTitle, AboutContainer, AboutContent, Founders } from './styles';

const About: React.FC = () => {
    return (
        <Container>
            <ImageContainer>
                <Title>Sobre nós</Title>
                <SubTitle>Saiba mais sobre o Find Your Change</SubTitle>
            </ImageContainer>
            <AboutContainer>
                <br />
                <span className="title">Quem somos?</span>
                <div className="separator" />
                <AboutContent>
                    <p>
                        O Find Your Change é uma plataforma de serviços que tem por fim conectar barbeiros,
                        tatuadores, body piercers e possíveis clientes. Através da nossa plataforma, buscamos
                        encurtar os laços entre os profissionais citados e pessoas que buscam os serviços
                        ofertados, de forma totalmente digital, facilitando a vida de todas as áreas envolvidas.
                        <br />
                        Oferecemos aos usuários a possibilidade de cadastrar seus serviços e realizar o agendamento
                        dos mesmos com outros usuários interessados. Além disso, ainda é disponibilizadda uma
                        ferramenta exclusiva de marketplace aos usuários que são prestadores de serviço para que
                        possam anunciar seus itens, realizar compras ou trocas. Também é apresentado um sistema de
                        avaliação de serviços e de prestadores para que possam ser recomendados aos novos usuários
                        que estarão acessando a plataforma.
                    </p>
                </AboutContent>
                <br />
                <span className="title">Como funciona?</span>
                <div className="separator" />
                <Founders>
                    <p>
                        É bem simples! Se você for prestador de serviço, basta realizar seu cadastro, indicando a
                        opção de prestador, preenchendo seus dados e selecionando a(s) sua(s) categoria(s). Logo em
                        seguida, basta realizar os cadastros do seu horário de atendimento, dos seus atendentes, e
                        dos serviços que você tem a oferecer. Ao concluir esses passos, basta aguardar para que um
                        possível cliente marque um horário de atendimento em seu estabelecimento. Você poderá
                        acessar facilmente essas informações através do seu acesso.
                        <br />
                        Você também pode fazer parte da rede exclusiva de Marketplace, podendo cadastrar seus
                        produtos, caso deseje vendê-los. Essa rede é interna e exclusiva para os prestadores de
                        serviço. Lá, você também pode acessar os produtos de outros prestadores e comprá-los se
                        possuir interesse.
                        <br />
                        Aos demais usuários, o processo também é bem simples. Basta navegar no sistema, escolher os
                        estabelecimentos que agradar, selecionar o serviço necessário e realizar o agendamento.
                        Porém, para confirmar o agendamento, é necessário possuir uma conta em nossa plataforma.
                        Quando estiver logado, poderá conferir os agendamentos realizados, poderá criar
                        recomendações, avaliando os serviços e assim ter uma lista de prestadores mais recomendados
                        na página inicial!
                    </p>
                </Founders>
            </AboutContainer>
        </Container>
    );
};

export default About;
