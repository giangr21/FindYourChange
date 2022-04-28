/* eslint-disable react/jsx-wrap-multilines */

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState, useEffect, ChangeEvent } from 'react';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Link, useHistory } from 'react-router-dom';
import { FaMapSigns, FaPhoneAlt } from 'react-icons/fa';
import api from '../../services/api';
import logoImg from '../../assets/logoPrincipalMobile.png';
import Button from '../../components/FormComponents/Button';
import Input from '../../components/FormComponents/Input';
import InputMask from '../../components/FormComponents/Input/InputMask';
import Radio from '../../components/FormComponents/Radio';
import getValidationErrors from '../../util/getValidationErrors';
import { Background, Container, Content, AnimationContainer, Row, Column } from './styles';
import SwitchInput from '../../components/FormComponents/Switch';
import FileInput from '../../components/FormComponents/File';

interface SignUpUserData {
    name: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    avatar: string;
}
interface SignUpProviderData {
    name: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    avatar: string;
    addressZipCode: string;
    addressStreet: string;
    addressNumber: string;
    addressComplement: string;
    addressArea: string;
    addressCity: string;
    addressState: string;
    addressCountry: string;
    isBarber: boolean;
    isTattoo: boolean;
    isPiercing: boolean;
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const [isProvider, setIsProvider] = useState(false);
    const [isBarber, setIsBarber] = useState(false);
    const [isTattoo, setIsTattoo] = useState(false);
    const [isPiercing, setIsPiercing] = useState(false);
    const [statusImgLogo, setStatusImgLogo] = useState<any>(null);
    const [prevPathProvider, setPrevPathProvider] = useState(false);

    const history: any = useHistory();

    const handleSubmitUser = useCallback(
        async (data: SignUpUserData) => {
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

                await schema.validate(data, {
                    abortEarly: false,
                });

                if (data.phone && data.phone !== '') {
                    data.phone = data.phone.replace(/[^\d]/g, '');
                }

                await api.post('user', data);
                history.push('/');
                toast.success('Usuário criado com sucesso!');
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    return;
                }
            }
        },
        [history],
    );

    const handleSubmitProvider = useCallback(
        async (data: SignUpProviderData) => {
            try {
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    name: Yup.string().required('Nome obrigatório'),
                    lastName: Yup.string().required('Sobrenome obrigatório'),
                    email: Yup.string()
                        .required('E-mail obrigatório')
                        .email('Digite um e-mail válido'),
                    password: Yup.string().min(4, 'No mínimo 4 dígitos'),
                    addressStreet: Yup.string().required('Rua obrigatória'),
                    addressNumber: Yup.string().required('Número obrigatório'),
                    addressArea: Yup.string().required('Bairro obrigatório'),
                    addressCity: Yup.string().required('Cidade obrigatória'),
                    addressState: Yup.string().required('Estado obrigatório'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                if (data.phone && data.phone !== '') {
                    data.phone = data.phone.replace(/[^\d]/g, '');
                }

                data.isBarber = isBarber;
                data.isTattoo = isTattoo;
                data.isPiercing = isPiercing;
                await api.post('provider/add', data);
                history.push('/');
                toast.success('Prestador de serviço criado com sucesso!');
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    return;
                }
            }
        },
        [isBarber, isTattoo, isPiercing, history],
    );

    useEffect(() => {
        if (
            history.location &&
            history.location.state &&
            history.location.state.prevPath.includes('/provider/')
        ) {
            setPrevPathProvider(true);
        }
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

    const getCep = useCallback(async () => {
        let cep = formRef.current?.getFieldValue('addressZipCode');
        cep = cep.replace(/[^\d]/g, '');
        if (cep === '' || cep.length < 8) {
            toast.error('Digite um cep válido.');
        } else {
            toast.error('Falha ao buscar cep');
        }
    }, []);

    const handleKeyPress = useCallback((event) => {
        if (event.key === 'Enter') {
            getCep();
        }
    }, []);

    const toggleBarber = () => {
        setIsBarber((prevState) => !prevState);
    };
    const toggleTattoo = () => {
        setIsTattoo((prevState) => !prevState);
    };
    const togglePiercing = () => {
        setIsPiercing((prevState) => !prevState);
    };

    return (
        <Container>
            <Background />
            <Content>
                <img src={logoImg} alt="logo" />
                <AnimationContainer>
                    <Form
                        ref={formRef}
                        onSubmit={isProvider ? handleSubmitProvider : handleSubmitUser}
                    >
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
                            <>
                                <Row>
                                    <Column>
                                        <Input name="name" icon={FiUser} placeholder="Nome" />
                                        <Input
                                            name="lastName"
                                            icon={FiUser}
                                            placeholder="Sobrenome"
                                        />
                                    </Column>
                                </Row>
                                <Row>
                                    <Column>
                                        <Input
                                            name="legalName"
                                            icon={FiUser}
                                            placeholder="Nome Fantasia"
                                        />
                                    </Column>
                                </Row>
                                <Row>
                                    <Column>
                                        <Input name="email" icon={FiMail} placeholder="E-mail" />
                                        <InputMask
                                            icon={FaPhoneAlt}
                                            mask="(99)99999-9999"
                                            name="phone"
                                            placeholder="Telefone"
                                        />
                                    </Column>
                                </Row>
                                <Row>
                                    <Column>
                                        <Input
                                            name="password"
                                            icon={FiLock}
                                            type="password"
                                            placeholder="Senha"
                                        />
                                        <InputMask
                                            mask="99999-999"
                                            name="addressZipCode"
                                            placeholder="CEP"
                                            cepIcon
                                            getCep={getCep}
                                            onKeyPress={handleKeyPress}
                                        />
                                    </Column>
                                </Row>
                                <Row>
                                    <Column>
                                        <Column>
                                            <Input
                                                name="addressStreet"
                                                placeholder="Rua"
                                                icon={FaMapSigns}
                                            />
                                            <Input
                                                name="addressArea"
                                                placeholder="Bairro"
                                                icon={FaMapSigns}
                                            />
                                        </Column>
                                    </Column>
                                </Row>
                                <Row>
                                    <Column>
                                        <Input
                                            name="addressNumber"
                                            placeholder="Número"
                                            icon={FaMapSigns}
                                        />
                                        <Input
                                            name="addressCity"
                                            placeholder="Cidade"
                                            icon={FaMapSigns}
                                        />
                                    </Column>
                                </Row>
                                <Row>
                                    <Column>
                                        <Input
                                            name="addressState"
                                            placeholder="Estado"
                                            icon={FaMapSigns}
                                        />
                                        <Input
                                            name="addressComplement"
                                            placeholder="Complemento"
                                            icon={FaMapSigns}
                                        />
                                    </Column>
                                </Row>
                                <div className="img">
                                    Selecione uma imagem
                                    <FileInput
                                        statusImgLogo={statusImgLogo}
                                        onChange={handleLogoChange}
                                    />
                                </div>
                                <div
                                    style={{
                                        margin: '10px 0px',
                                    }}
                                >
                                    Serviços
                                </div>
                                <Row>
                                    <Column>
                                        <div
                                            style={{
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                width: '100%',
                                            }}
                                        >
                                            <span>Barbearia:</span>
                                            <SwitchInput
                                                onChange={toggleBarber}
                                                isChecked={isBarber}
                                            />
                                            <span>Tatuagem:</span>
                                            <SwitchInput
                                                onChange={toggleTattoo}
                                                isChecked={isTattoo}
                                            />
                                            <span>Piercing:</span>
                                            <SwitchInput
                                                onChange={togglePiercing}
                                                isChecked={isPiercing}
                                            />
                                        </div>
                                    </Column>
                                </Row>
                            </>
                        ) : (
                            <>
                                <Row>
                                    <Input name="name" icon={FiUser} placeholder="Nome" />
                                </Row>
                                <Row>
                                    <Input name="lastName" icon={FiUser} placeholder="Sobrenome" />
                                </Row>
                                <Row>
                                    <InputMask
                                        icon={FaPhoneAlt}
                                        mask="(99)99999-9999"
                                        name="phone"
                                        placeholder="Telefone"
                                    />
                                </Row>
                                <Row>
                                    <Input name="email" icon={FiMail} placeholder="E-mail" />
                                </Row>
                                <Row>
                                    <Input
                                        name="password"
                                        icon={FiLock}
                                        type="password"
                                        placeholder="Senha"
                                    />
                                </Row>
                                <div className="img">
                                    Selecione uma imagem
                                    <FileInput
                                        statusImgLogo={statusImgLogo}
                                        onChange={handleLogoChange}
                                    />
                                </div>
                            </>
                        )}

                        <Button type="button" onClick={() => formRef.current?.submitForm()}>
                            Finalizar Cadastro
                        </Button>
                    </Form>

                    <Link to={prevPathProvider ? history.location.state.prevPath : '/signIn'}>
                        <FiArrowLeft />
                        {prevPathProvider ? 'Voltar para estabelecimento' : 'Voltar para login'}
                    </Link>
                </AnimationContainer>
            </Content>
        </Container>
    );
};

export default SignUp;
