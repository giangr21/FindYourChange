import React, { useState, useEffect , useRef, useCallback} from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import ReactModal from 'react-modal';
import { MdDeleteForever } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import { FiAlertOctagon } from 'react-icons/fi';
import { Container, RightContainer, Row } from './styles';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import getValidationErrors from '../../../util/getValidationErrors';
import { Link, useHistory } from 'react-router-dom';
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';
import { useAuth } from '../../../hooks/Auth';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

interface ModalProps {
    children?: any;
    isOpen: boolean;
    setIsOpen: () => void;
    handleConfirm: () => void;
}
interface SignInFormData {
    email: string;
    password: string;
}

const ModalAppointment: React.FC<ModalProps> = ({ children, isOpen, setIsOpen, handleConfirm }) => {
    const [modalStatus, setModalStatus] = useState(isOpen);
    const formRef = useRef<FormHandles>(null);
    const { signIn } = useAuth();
    const [isProvider, setIsProvider] = useState(false);
    const history = useHistory();

    useEffect(() => {
        setModalStatus(isOpen);
        setTimeout(() => {
            formRef.current?.setFieldValue('isProvider', 'false');
        }, 300);
    }, [isOpen]);

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
                    isProvider,
                });

                return setModalStatus(false);
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
        [history, isProvider, signIn],
    );
    return (
        <ReactModal
            shouldCloseOnOverlayClick={!false}
            onRequestClose={setIsOpen}
            isOpen={modalStatus}
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
                    width: '800px',
                    border: 'none',
                    padding: '10px',
                    height: '450px',
                    display: 'flex',
                },
                overlay: {
                    backgroundColor: '#121214e6',
                },
            }}
        >
            {/* {children} */}
            <Container>

                <RightContainer>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h2>Agendar Horário</h2>
                        <Row>
                            <Input name="email" icon={FiMail} placeholder="E-mail" />
                        </Row>
                        <Row>
                            <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
                        </Row>

                        <Button type="submit">Agendar</Button>

                    </Form>

                </RightContainer>
            </Container>
        </ReactModal>
    );
};

export default ModalAppointment;
