import React, { useRef, useCallback, useEffect, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import IconButton from '../FormComponents/Button/IconButton';
import { Container, HeaderFilter, Form, FooterFilter } from './styles';
import { useAuth } from '../../hooks/Auth';
// import Select from '../Select';

interface FilterProps {
    showFilter: boolean;
    submitFilter: (filter: any) => void;
    conditionClearIncident?: boolean;
}

const Filter: React.FC<FilterProps> = ({ showFilter, submitFilter, conditionClearIncident, children }) => {
    const formRef = useRef<FormHandles>(null);
    const { user } = useAuth();
    const [optionsSelect, setOptionsSelect] = useState<any>([]);

    const clearFilter = useCallback(() => {
        formRef.current?.reset();

        setTimeout(() => {
            formRef.current?.submitForm();
        }, 300);
    }, []);

    const formFilterSubmit = useCallback(
        async (filter: any) => {
            try {
                formRef.current?.setErrors({});
                // const schema = Yup.object().shape({
                //     central: Yup.string().required('Central obrigatória'),
                // });

                // await schema.validate(filter, {
                //     abortEarly: false,
                // });
                submitFilter(filter);
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    toast.error('Necessário escolher uma central!');
                }
            }
        },
        [submitFilter],
    );

    return (
        <Container showFilter={showFilter}>
            <HeaderFilter>
                <strong>Filtros</strong>
            </HeaderFilter>
            <Form ref={formRef} onSubmit={formFilterSubmit}>
                {children}
                <div className="space">
                    {/* <Select
                        name="central"
                        fieldValue="value"
                        fieldLabel="label"
                        label="Central"
                        placeholder=""
                        className="react-select-container"
                        defaultValue={defaultOption}
                        options={optionsSelect}
                    /> */}
                </div>
            </Form>
            <FooterFilter>
                <IconButton icon={MdDeleteForever} title="Limpar" background="#777777" action={clearFilter} />
                <IconButton
                    icon={FaCheck}
                    title="Aplicar"
                    background="#00A57C"
                    action={() => formRef.current?.submitForm()}
                />
            </FooterFilter>
        </Container>
    );
};

export default Filter;
