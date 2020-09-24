/* eslint-disable react/jsx-wrap-multilines */

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState, useEffect, ChangeEvent } from 'react';
import { FiArrowLeft, FiCamera, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { MdClose, MdCheck } from 'react-icons/md';
import { BsCheckAll } from 'react-icons/bs';
import Switch from 'react-switch';

// import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { FaMapSigns, FaPhoneAlt } from 'react-icons/fa';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import InputMask from '../../components/Input/InputMask';
import Radio from '../../components/Radio';
import getValidationErrors from '../../util/getValidationErrors';
import { Background, Container, Content, AnimationContainer, Row, Column } from './styles';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const [isProvider, setIsProvider] = useState(false);
    const [isBarber, setIsBarber] = useState(false);
    const [isTattoo, setIsTattoo] = useState(false);
    const [isPiercing, setIsPiercing] = useState(false);
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

    const getCep = useCallback(async () => {
        //     let cep = formRef.current?.getFieldValue('addressZipCode');
        //     cep = cep.replace(/[^\d]/g, '');
        //     if (cep === '' || cep.length < 8) {
        //         toast.error('Digite um cep valido.');
        //     } else {
        //         await api
        //             .get(`/street/${cep}`)
        //             .then((response) => {
        //                 if (response.data !== '') {
        //                     if (response.data.clearPublicPlace === '') {
        //                         setDisableAddressFields(false);
        //                     } else {
        //                         setDisableAddressFields(true);
        //                     }
        //                     formRef.current?.setFieldValue('addressArea', `${response.data.area.clearName}`);
        //                     formRef.current?.setFieldValue('addressCity', `${response.data.city.clearName}`);
        //                     formRef.current?.setFieldValue('addressCountry', 'Brasil');
        //                     formRef.current?.setFieldValue('addressStreet', `${response.data.clearPublicPlace}`);
        //                     formRef.current?.setFieldValue('addressState', {
        //                         value: response.data.stateId,
        //                         label: response.data.stateId,
        //                     });
        //                     if (edit) {
        //                         formRef.current?.setFieldValue('addressNumber', '');
        //                         formRef.current?.setFieldValue('addressComplement', '');
        //                     }
        //                     const inputNumber = formRef.current?.getFieldRef('addressNumber');
        //                     if (inputNumber) {
        //                         inputNumber.focus();
        //                     }
        //                 } else {
        //                     toast.error('Digite um cep valido.');
        //                 }
        //             })
        //             .catch((error) => {
        //                 console.log(error);
        //                 toast.error('Falha ao buscar cep');
        //             });
        //     }
    }, []);

    const handleKeyPress = useCallback((event) => {
        //     if (event.key === 'Enter') {
        //         getCep();
        //     }
    }, []);

    const toggleBarber = useCallback(() => {
        setIsBarber((prevState) => !prevState);
    }, []);
    const toggleTattoo = useCallback(() => {
        setIsTattoo((prevState) => !prevState);
    }, []);
    const togglePiercing = useCallback(() => {
        setIsPiercing((prevState) => !prevState);
    }, []);

    return (
        <Container>
            <Background />
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="logo" />

                    <Form ref={formRef} onSubmit={handleSubmit}>
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
                                        <Input name="lastName" icon={FiUser} placeholder="Sobrenome" />
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
                                        <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
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
                                                // disabled={disableAddressFields}
                                                name="addressStreet"
                                                placeholder="Rua"
                                                icon={FaMapSigns}
                                            />
                                            <Input
                                                // disabled={disableAddressFields}
                                                name="addressArea"
                                                placeholder="Bairro"
                                                icon={FaMapSigns}
                                            />
                                        </Column>
                                    </Column>
                                </Row>
                                <Row>
                                    <Column>
                                        <Input name="addressNumber" placeholder="Numero" icon={FaMapSigns} />
                                        <Input
                                            disabled
                                            name="addressCity"
                                            placeholder="Cidade"
                                            icon={FaMapSigns}
                                        />
                                    </Column>
                                </Row>
                                <Row>
                                    <Column>
                                        <Input name="addressNumber" placeholder="Estado" icon={FaMapSigns} />
                                        <Input
                                            disabled
                                            name="addressComplement"
                                            placeholder="Complemento"
                                            icon={FaMapSigns}
                                        />
                                    </Column>
                                </Row>
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
                                                // display: 'flex',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                width: '100%',
                                            }}
                                        >
                                            <span>Barbearia:</span>
                                            <Switch
                                                onChange={toggleBarber}
                                                checked={isBarber}
                                                uncheckedIcon={
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            height: '100%',
                                                            fontSize: 19,
                                                        }}
                                                    >
                                                        <MdClose />
                                                    </div>
                                                }
                                                checkedIcon={
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            height: '100%',
                                                            fontSize: 19,
                                                        }}
                                                    >
                                                        <MdCheck />
                                                    </div>
                                                }
                                                height={23}
                                                width={55}
                                                onColor="#2e656a"
                                                offColor="#c53030"
                                            />
                                            <span>Tatuagem:</span>
                                            <Switch
                                                onChange={toggleTattoo}
                                                checked={isTattoo}
                                                uncheckedIcon={
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            height: '100%',
                                                            fontSize: 19,
                                                        }}
                                                    >
                                                        <MdClose />
                                                    </div>
                                                }
                                                checkedIcon={
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            height: '100%',
                                                            fontSize: 19,
                                                        }}
                                                    >
                                                        <MdCheck />
                                                    </div>
                                                }
                                                height={23}
                                                width={55}
                                                onColor="#2e656a"
                                                offColor="#c53030"
                                            />
                                            <span>Piercing:</span>
                                            <Switch
                                                onChange={togglePiercing}
                                                checked={isPiercing}
                                                uncheckedIcon={
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            height: '100%',
                                                            fontSize: 19,
                                                        }}
                                                    >
                                                        <MdClose />
                                                    </div>
                                                }
                                                checkedIcon={
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            height: '100%',
                                                            fontSize: 19,
                                                        }}
                                                    >
                                                        <MdCheck />
                                                    </div>
                                                }
                                                height={23}
                                                width={55}
                                                onColor="#2e656a"
                                                offColor="#c53030"
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
                                    <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
                                </Row>
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
                            </>
                        )}

                        <Button type="submit">Finalizar Cadastro</Button>
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
