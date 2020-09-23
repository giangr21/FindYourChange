import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState, useEffect, ChangeEvent } from 'react';
import { FiArrowLeft, FiCamera, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { BsCheckAll } from 'react-icons/bs';
// import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { FaPhoneAlt } from 'react-icons/fa';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import InputMask from '../../components/Input/InputMask';
import Radio from '../../components/Radio';
import getValidationErrors from '../../util/getValidationErrors';
import { Background, Container, Content, AnimationContainer } from './styles';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const [isProvider, setIsProvider] = useState(false);
    const [statusImgLogo, setStatusImgLogo] = useState<any>(null);

    const history = useHistory();

    const handleSubmit = useCallback(async (data: SignUpFormData) => {
        // try {
        //     formRef.current?.setErrors({});
        //     const schema = Yup.object().shape({
        //         name: Yup.string().required('Nome obrigatório'),
        //         email: Yup.string()
        //             .required('E-mail obrigatório')
        //             .email('Digite um e-mail válido'),
        //         password: Yup.string().min(6, 'No mínimo 6 digitos'),
        //     });
        //     await schema.validate(data, {
        //         abortEarly: false,
        //     });
        //     await api.post('users', data);
        //     history.push('/');
        //     addToast({
        //         type: 'success',
        //         title: 'Cadastro realizado!',
        //         description: 'Voce já pode fazer seu login no GoBarber!',
        //     });
        // } catch (err) {
        //     if (err instanceof Yup.ValidationError) {
        //         const errors = getValidationErrors(err);
        //         formRef.current?.setErrors(errors);
        //         return;
        //     }
        //     addToast({
        //         type: 'error',
        //         title: 'Erro no cadastro',
        //         description:
        //             'Ocorreu um erro ao fazer cadastro, tente novamente.',
        //     });
        // }
    }, []);

    useEffect(() => {
        setTimeout(() => {
            formRef.current?.setFieldValue('isProvider', 'false');
        }, 500);
    }, []);

    const changeRadioButton = useCallback(() => {
        setIsProvider((prevState) => !prevState);
    }, []);

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
        <Container>
            <Background />
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="logo" />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faça seu cadastro</h1>
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
                        {isProvider ? (
                            <h1>lalal</h1>
                        ) : (
                            <>
                                <Input name="name" icon={FiUser} placeholder="Nome" />
                                <Input name="lastName" icon={FiUser} placeholder="Sobrenome" />
                                <InputMask
                                    icon={FaPhoneAlt}
                                    mask="(99)99999-9999"
                                    name="phone"
                                    placeholder="Telefone"
                                />
                                <Input name="email" icon={FiMail} placeholder="E-mail" />
                                <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
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
                                        <BsCheckAll className="check" size={25} color="#00A57C" />
                                    )}
                                </div>
                            </>
                        )}

                        <Button type="submit">Cadastrar</Button>
                    </Form>

                    <Link to="/">
                        <FiArrowLeft />
                        Voltar para login
                    </Link>
                </AnimationContainer>
            </Content>
        </Container>
    );
};

export default SignUp;
