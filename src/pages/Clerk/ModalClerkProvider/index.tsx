import React, { useRef, useCallback, useState, useEffect, ChangeEvent } from 'react';
import { FormHandles } from '@unform/core';
import { FiCamera, FiCheckSquare } from 'react-icons/fi';
import { FaWindowClose } from 'react-icons/fa';

import { Form, Container, Header, Footer, Content } from './styles';
import Input from '../../../components/Input/InputModal';
import Modal from '../../../components/Modal';
import IconButton from '../../../components/Button/IconButton';
import { BsCheckAll } from 'react-icons/bs';
import * as Yup from 'yup';
import api from '../../../services/api';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import getValidationErrors from '../../../util/getValidationErrors';
// import api from '../../../services/api';
// import getValidationErrors from '../../../util/getValidationErrors';
// import Loading from '../../../components/Loading';

interface ModalProps {
    isOpen: boolean;
    setIsOpen: () => void;
    edit: boolean;
}

interface ClerkData {
    name: string;
    email: string;
    phone: string;
    image: string;    
}

const ModalClerkProvider: React.FC<ModalProps> = ({ setIsOpen, isOpen, edit }) => {
    const formRef = useRef<FormHandles>(null);
    const [loading, setLoading] = useState(true);
    const [statusImgLogo, setStatusImgLogo] = useState<any>(null);
    const history = useHistory();

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

    const submitClerk = useCallback(async (data: ClerkData) => {
        console.log(data);
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                lastName: Yup.string().required('Sobrenome obrigatório'),
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string().min(4, 'No mínimo 4 digitos'),
            });
            console.log(data);
            await schema.validate(data, {
                abortEarly: false,
            });

            if (data.phone && data.phone !== '') {
                data.phone = data.phone.replace(/[^\d]/g, '');
            }

            await api.post('user', data);
            history.push('/');
            toast.success('Usuario criado com sucesso!')
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
                return;
            }
        }
    }, [history]);

    return (
        <Modal width="420px" height="400px" isOpen={isOpen} setIsOpen={setIsOpen}>
            <Form ref={formRef} onSubmit={submitClerk}>
                <Header>
                    {edit ? <h1>Editar Atendente</h1> : <h1>Novo Atendente</h1>}
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
                                <Input name="name" placeholder="Nome" />
                            </div>
                        </Container>
                        <Container>
                            <Input name="email" placeholder="Email" />
                        </Container>
                        <Container>
                            <div
                                style={{
                                    padding: '2px',
                                    marginTop: '15px',
                                    width: '100%',
                                }}
                            >
                                <Input name="phone" placeholder="Telefone" />
                            </div>
                        </Container>
                        <Container>
                            <div className="img"
                                 style={{
                                    padding: '2px',
                                    marginTop: '15px',
                                    width: '100%',
                                 }}
                            >
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
                            title={edit ? 'Editar Atendente' : 'Adicionar Atendente'}
                            background="#2e656a"
                            action={() => formRef.current?.submitForm()}
                        />
                    </div>
                </Footer>
            </Form>
        </Modal>
    );
};

export default ModalClerkProvider;
