import React, { useState, useEffect , useRef, useCallback} from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import ReactModal from 'react-modal';
import { MdDeleteForever } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import { FiAlertOctagon } from 'react-icons/fi';
import { Container, LeftContainer, RightContainer, Row } from './styles';
import IconButton from '../../Button/IconButton';
import logoImg from '../../../assets/logoPrincipalMobile.png';
import Radio from '../../../components/Radio';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import getValidationErrors from '../../../util/getValidationErrors';
import { Link, useHistory } from 'react-router-dom';
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';

interface ModalProps {
    children?: any;
    isOpen: boolean;
    setIsOpen: () => void;
    handleConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, setIsOpen, handleConfirm }) => {
    const [modalStatus, setModalStatus] = useState(isOpen);
    const formRef = useRef<FormHandles>(null);

    useEffect(() => {
        setModalStatus(isOpen);
    }, [isOpen]);

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
                <LeftContainer>

                </LeftContainer>
                <RightContainer>
                    <img src={logoImg} alt="logo" width="35%"/>
                    <Form ref={formRef} onSubmit={handleConfirm}>
                        <h2>Login</h2>
                        <Row>
                            <Input name="email" icon={FiMail} placeholder="E-mail" />
                        </Row>
                        <Row>
                            <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
                        </Row>

                        <Button type="submit">Entrar</Button>

                        <Link to="/forgotPassword">Esqueci minha senha</Link>
                    </Form>
                    <Link to="/signup">
                        <FiLogIn />
                        Criar Conta
                    </Link>
                </RightContainer>
            </Container>
        </ReactModal>
    );
};

export default Modal;
