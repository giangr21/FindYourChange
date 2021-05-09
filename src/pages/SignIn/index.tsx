import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiLock, FiMail } from 'react-icons/fi';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowLeft, ArrowRight } from 'baseui/icon';
import logoImg from '../../assets/logoPrincipalMobile.png';
import Button from '../../components/FormComponents/Button';
import Input from '../../components/FormComponents/Input';
import { useAuth } from '../../hooks/authentication';
import getValidationErrors from '../../util/getValidationErrors';
import { Background, Container, Content, AnimationContainer, Row } from './styles';
import Radio from '../../components/FormComponents/Radio';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const [isProvider, setIsProvider] = useState(true);
    const { signIn } = useAuth();
    const history = useHistory();

    useEffect(() => {
        setTimeout(() => {
            formRef.current?.setFieldValue('isProvider', 'true');
        }, 300);
    }, []);

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

                return isProvider ? history.push('/homeProvider') : history.push('/');
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

    const changeRadioButton = useCallback(() => {
        setIsProvider((prevState) => !prevState);
    }, []);

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="logo" />
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <div
                            style={{
                                marginBottom: '24px',
                            }}
                        >
                            <Radio
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                name="isProvider"
                                options={[
                                    {
                                        id: 'false',
                                        label: 'Cliente',
                                    },
                                    { id: 'true', label: 'Prestador de serviço' },
                                ]}
                                onChange={changeRadioButton}
                            />
                        </div>
                        <Row>
                            <Input name="email" icon={FiMail} placeholder="E-mail" />
                        </Row>
                        <Row>
                            <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
                        </Row>

                        <Button type="submit">Entrar</Button>

                        <Link to="/forgotPassword">Esqueci minha senha</Link>
                    </Form>
                    <div className="links">
                        <Link to="/signup">
                            <ArrowRight size={25} />
                            Criar Conta
                        </Link>
                        <Link to="/">
                            <ArrowLeft size={25} />
                            Voltar
                        </Link>
                    </div>
                </AnimationContainer>
            </Content>
            <Background />
        </Container>
    );
};

export default SignIn;
