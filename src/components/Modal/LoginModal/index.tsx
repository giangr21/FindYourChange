import React, { useRef, useCallback } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import ReactModal from 'react-modal';
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Container, LeftContainer, RightContainer, Row } from './styles';
import logoImg from '../../../assets/logoPrincipalMobile.png';
import Button from '../../FormComponents/Button';
import Input from '../../FormComponents/Input';
import getValidationErrors from '../../../util/getValidationErrors';

import { useAuth } from '../../../hooks/authentication';
import { useMedia } from '../../../util/use-media';

interface ModalProps {
    children?: any;
    isOpen: boolean;
    setIsOpen: () => void;
}
interface SignInFormData {
    email: string;
    password: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, setIsOpen }) => {
    const mobile = useMedia('(max-width: 760px)');
    const formRef = useRef<FormHandles>(null);
    const location = useLocation();
    const { signIn } = useAuth();

    const handleSubmit = useCallback(
        async (data: SignInFormData) => {
            try {
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                    password: Yup.string().required('Senha obrigatória'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                await signIn({
                    email: data.email,
                    password: data.password,
                    isProvider: false,
                });

                setIsOpen();
                toast.success('Autenticação realizada com sucesso!!');
            } catch (err) {
                console.log(err);
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    return;
                }
                toast.error('Ocorreu um erro ao fazer login, cheque as credenciais.');
            }
        },
        [setIsOpen, signIn],
    );
    return (
        <ReactModal
            shouldCloseOnOverlayClick={!false}
            onRequestClose={setIsOpen}
            isOpen={isOpen}
            ariaHideApp={false}
            style={{
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    background: '#fff',
                    color: 'black',
                    borderRadius: '8px',
                    width: mobile ? '100%' : '800px',
                    border: 'none',
                    padding: '10px',
                    height: mobile ? '70%' : '550px',
                    display: 'flex',
                },
                overlay: {
                    backgroundColor: '#121214e6',
                },
            }}
        >
            <Container>
                <LeftContainer />
                <RightContainer>
                    <img src={logoImg} alt="logo" width="35%" />
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h2>Para realizar um agendamento é necessario estar logado.</h2>
                        <Row>
                            <Input name="email" icon={FiMail} placeholder="E-mail" />
                        </Row>
                        <Row>
                            <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
                        </Row>

                        <Button type="submit">Entrar</Button>

                        <Link to="/forgotPassword">Esqueci minha senha</Link>
                    </Form>
                    <Link to={{ pathname: '/signup', state: { prevPath: location.pathname } }}>
                        <FiLogIn />
                        Criar Conta
                    </Link>
                </RightContainer>
            </Container>
        </ReactModal>
    );
};

export default Modal;
