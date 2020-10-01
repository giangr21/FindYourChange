import React, { useRef, useCallback, useState, useEffect, ChangeEvent } from 'react';
import { FormHandles } from '@unform/core';
import { FiCamera, FiCheckSquare } from 'react-icons/fi';
import { FaWindowClose } from 'react-icons/fa';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';

import { BsCheckAll } from 'react-icons/bs';
import { Form, Container, Header, Footer, Content } from './styles';
import Input from '../../../components/Input/InputModal';
import Modal from '../../../components/Modal';
import IconButton from '../../../components/Button/IconButton';
import Radio from '../../../components/Radio';
// import api from '../../../services/api';
// import getValidationErrors from '../../../util/getValidationErrors';
// import Loading from '../../../components/Loading';

interface ModalProps {
    isOpen: boolean;
    setIsOpen: () => void;
    edit: boolean;
}

const ModalProductProvider: React.FC<ModalProps> = ({ setIsOpen, isOpen, edit }) => {
    const formRef = useRef<FormHandles>(null);
    const [loading, setLoading] = useState(true);
    const [statusImgLogo, setStatusImgLogo] = useState<any>(null);

    const handleLogoChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e);
        // if (e.target.files) {
        //     setStatusImgLogo(true);
        //     const data = new FormData();
        //     data.append('image', e.target.files[0]);
        //     const maxAllowedSize = 30 * 1024 * 1024;
        //     if (e.target.files[0].size > maxAllowedSize) {
        //         toast.error('Falha ao inserir imagem, limite de tamanho excedido');
        //         setStatusImgLogo(null);
        //     } else {
        //         await api
        //             .post('/storage/img', data)
        //             .then((response) => {
        //                 setStatusImgLogo(false);
        //                 setMerchantLogo(response.data);
        //             })
        //             .catch((error) => {
        //                 console.log(error);
        //                 toast.error('Falha ao inserir imagem');
        //                 setStatusImgLogo(null);
        //             });
        //     }
        // }
    }, []);

    return (
        <Modal width="420px" height="530px" isOpen={isOpen} setIsOpen={setIsOpen}>
            <Form ref={formRef} onSubmit={() => {}}>
                <Header>
                    {edit ? <h1>Editar Produto</h1> : <h1>Novo Produto</h1>}
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
                                    width: '100%',
                                    marginBottom: '15px',
                                }}
                            >
                                <Input name="name" placeholder="Nome" />
                            </div>
                        </Container>
                        <Container>
                            <div
                                style={{
                                    padding: '2px',
                                    width: '100%',
                                    marginBottom: '15px',
                                }}
                            >
                                <Input name="name" placeholder="Valor $" />
                            </div>
                        </Container>
                        <Container>
                            <div
                                style={{
                                    padding: '2px',
                                    width: '100%',
                                    marginBottom: '15px',
                                }}
                            >
                                <Input name="name" placeholder="Quantidade" />
                            </div>
                        </Container>
                        <Container>
                            <div
                                style={{
                                    padding: '2px',
                                    width: '100%',
                                    marginBottom: '15px',
                                }}
                            >
                                <Input name="name" placeholder="Categoria" />
                            </div>
                        </Container>
                        <Container>
                            <div
                                style={{
                                    padding: '2px',
                                    width: '100%',
                                    marginBottom: '5px',
                                }}
                            >
                                <Input name="name" placeholder="Descricao" />
                            </div>
                        </Container>
                        <Container>
                            <div className="img">
                                Selecione uma imagem
                                {statusImgLogo === null && (
                                    <label htmlFor="avatar">
                                        <FiCamera />
                                        <input
                                            accept=".jpg, .jpeg, .png"
                                            onChange={handleLogoChange}
                                            type="file"
                                            id="avatar"
                                        />
                                    </label>
                                )}
                                {statusImgLogo === true && <span>Carregando...</span>}
                                {statusImgLogo === false && (
                                    <BsCheckAll className="check" size={25} color="#2e656a" />
                                )}
                            </div>
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
                            title={edit ? 'Editar Produto' : 'Adicionar Produto'}
                            background="#2e656a"
                            action={() => {}}
                        />
                    </div>
                </Footer>
            </Form>
        </Modal>
    );
};

export default ModalProductProvider;
