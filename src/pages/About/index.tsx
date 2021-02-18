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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et dolor bibendum diam
                        ullamcorper bibendum vitae a ex. Ut in ipsum lacus. Nullam dictum nisi sem, sed sagittis
                        arcu ultricies ut. Mauris sodales nisl velit. Mauris quis velit at urna bibendum viverra.
                        Pellentesque sodales laoreet nunc, et blandit libero lobortis eget. Pellentesque
                        pellentesque sed mauris dictum porttitor. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Praesent et dolor bibendum diam ullamcorper bibendum vitae a ex. Ut in
                        ipsum lacus. Nullam dictum nisi sem, sed sagittis arcu ultricies ut. Mauris sodales nisl
                        velit. Mauris quis velit at urna bibendum viverra. Pellentesque sodales laoreet nunc, et
                        blandit libero lobortis eget. Pellentesque pellentesque sed mauris dictum porttitor. Lorem
                        ipsum dolor sit amet, consectetur adipiscing elit. Praesent et dolor bibendum diam
                        ullamcorper bibendum vitae a ex. Ut in ipsum lacus. Nullam dictum nisi sem, sed sagittis
                        arcu ultricies ut. Mauris sodales nisl velit. Mauris quis velit at urna bibendum viverra.
                        Pellentesque sodales laoreet nunc, et blandit libero lobortis eget. Pellentesque
                        pellentesque sed mauris dictum porttitor. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Praesent et dolor bibendum diam ullamcorper bibendum vitae a ex. Ut in
                        ipsum lacus. Nullam dictum nisi sem, sed sagittis arcu ultricies ut. Mauris sodales nisl
                        velit. Mauris quis velit at urna bibendum viverra. Pellentesque sodales laoreet nunc, et
                        blandit libero lobortis eget. Pellentesque pellentesque sed mauris dictum porttitor.
                    </p>
                </Founders>
            </AboutContainer>
        </Container>
    );
};

export default About;
