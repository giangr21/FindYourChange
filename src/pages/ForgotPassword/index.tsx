import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';
import * as Yup from 'yup';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../util/getValidationErrors';
import { AnimationContainer, Wrapper, Content } from './styles';
import api from '../../services/api';
import logo from '../../assets/logoFYC.png';

interface ForgotPasswordFormData {
    email: string;
    password: string;
}

const ForgotPassword: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const formRef = useRef<FormHandles>(null);
    const location = useLocation();
    const history = useHistory();

    const handleSubmit = useCallback(
        async (data: ForgotPasswordFormData) => {
            history.push('/signIn');
            // try {
            //     setLoading(true);
            //     formRef.current?.setErrors({});
            //     const schema = Yup.object().shape({
            //         email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
            //     });
            //     await schema.validate(data, {
            //         abortEarly: false,
            //     });
            //     const systemType = location.search.substring(1);
            //     await api
            //         .post('/sessions/forgotPassword', {
            //             email: data.email,
            //             systemType,
            //         })
            //         .then((response) => {
            //             toast.success(
            //                 'Enviamos um e-mail para confirmar a recuperacao de senha, cheque sua caixa de mensagens',
            //             );
            //         })
            //         .catch((e) => {
            //             if (e.response.data.message) {
            //                 return toast.error(e.response.data.message.message);
            //             }
            //             toast.error('Ocorreu um erro na recuperação de senha, tente novamente.');
            //         });
            // } catch (err) {
            //     if (err instanceof Yup.ValidationError) {
            //         const errors = getValidationErrors(err);
            //         formRef.current?.setErrors(errors);
            //         return;
            //     }
            //     toast.error('Ocorreu um erro na recuperação de senha, tente novamente.');
            // } finally {
            //     setLoading(false);
            // }
        },
        [history, location.search],
    );

    return (
        <Wrapper>
            <Content>
                <AnimationContainer>
                    <img src={logo} alt="logo" />
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Recuperar senha</h1>
                        <Input name="email" icon={FiMail} placeholder="E-mail" type="email" />

                        <Button loading={loading} type="submit">
                            Recuperar
                        </Button>
                    </Form>
                    <Link to="/signIn">
                        <FiLogIn />
                        Voltar ao login
                    </Link>
                </AnimationContainer>
            </Content>
        </Wrapper>
    );
};

export default ForgotPassword;
