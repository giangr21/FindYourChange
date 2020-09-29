import React, { useRef, useCallback, useState, useEffect } from 'react';
import { FormHandles } from '@unform/core';
import { FiCheckSquare } from 'react-icons/fi';
import { FaWindowClose } from 'react-icons/fa';

import { Form, Container, Header, Footer, Content } from './styles';
import Input from '../../../components/Input/InputModal';
import Modal from '../../../components/Modal';
import IconButton from '../../../components/Button/IconButton';
// import api from '../../../services/api';
// import getValidationErrors from '../../../util/getValidationErrors';
// import Loading from '../../../components/Loading';

interface ModalProps {
    isOpen: boolean;
    setIsOpen: () => void;
    edit: boolean;
}

const ModalServicesProvider: React.FC<ModalProps> = ({ setIsOpen, isOpen, edit }) => {
    const formRef = useRef<FormHandles>(null);
    const [loading, setLoading] = useState(true);

    return (
        <Modal width="420px" height="330px" isOpen={isOpen} setIsOpen={setIsOpen}>
            <Form ref={formRef} onSubmit={() => {}}>
                <Header>
                    {edit ? <h1>Editar Serviço</h1> : <h1>Novo Serviço</h1>}
                    <FaWindowClose size={20} onClick={setIsOpen} />
                </Header>
                <Content>
                    {/* {loading ? (
                        <Loading heightLoading="6vh" />
                    ) : ( */}
                    <>
                        <Container>
                            <div
                                style={{
                                    padding: '2px',
                                    marginBottom: '15px',
                                    width: '100%',
                                }}
                            >
                                <Input name="name" placeholder="Título" />
                            </div>
                        </Container>
                        <Container>
                            <div
                                style={{
                                    padding: '2px',
                                    marginBottom: '15px',
                                    width: '100%',
                                }}
                            >
                                <Input name="value" placeholder="Valor $" />
                            </div>
                        </Container>
                        <Container>
                            <Input name="description" placeholder="Descrição" />
                        </Container>
                    </>
                    {/* )} */}
                </Content>
                <Footer>
                    <div />
                    <div
                        style={{
                            display: 'flex',
                        }}
                    >
                        <IconButton
                            icon={FiCheckSquare}
                            title={edit ? 'Editar Serviço' : 'Adicionar Serviço'}
                            background="#2e656a"
                            action={() => {}}
                        />
                    </div>
                </Footer>
            </Form>
        </Modal>
    );
};

export default ModalServicesProvider;
