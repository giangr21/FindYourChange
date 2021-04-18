/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import ReactSelect, { OptionTypeBase, Props as SelectProps } from 'react-select';
import { useField } from '@unform/core';
import { Container } from './style';

interface Props extends SelectProps<OptionTypeBase> {
    name: string;
    fieldValue: string;
    fieldLabel: string;
    label: string;
    notCleaning?: boolean;
    biggerWidth?: boolean;
}

const Select: React.FC<Props> = ({
    name,
    fieldValue = 'value',
    fieldLabel = 'label',
    options = [],
    label,
    notCleaning,
    biggerWidth = false,
    ...rest
}) => {
    const selectRef = useRef(null);
    const { fieldName, defaultValue, registerField, error } = useField(name);
    const [selectOptions, setSelectOptions] = useState<Array<any>>([]);
    useEffect(() => {
        setSelectOptions(
            options.map((option: any) => {
                return {
                    value: option[fieldValue],
                    label: option[fieldLabel],
                };
            }),
        );
    }, [fieldLabel, fieldValue, options]);

    useEffect(() => {
        if (defaultValue !== undefined) {
            if (Array.isArray(defaultValue)) {
                return;
            }
            if (defaultValue !== null && !('value' in defaultValue)) {
                defaultValue.value = defaultValue.id;
                delete defaultValue.id;
            }
        }
    }, [defaultValue]);

    const customTheme = useCallback((theme: any) => {
        return {
            ...theme,
            borderRadius: 0,
            colors: {
                ...theme.colors,
                primary25: '#f9f9f9',
                primary: '#ff9000',
            },
        };
    }, []);

    const customStyles = useMemo(() => {
        return {
            container: (base: any) => ({
                ...base,
                width: '100%',
            }),
            control: (base: any) => ({
                ...base,
                // border: '1px solid #ff9000',
                borderRadius: '10px',
                marginRight: '0px',
                padding: '5px 0px',
                background: '#f9f9f9',
                color: '#232129',
                fontSize: '16px',
            }),
            placeholder: (base: any) => ({
                ...base,
                color: '#232129',
                fontSize: '14px',
            }),
            menuList: (base: any) => ({
                ...base,
                color: '#232129',
                fontSize: '14px',
            }),
        };
    }, []);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: selectRef.current,
            path: undefined,
            getValue: (ref: any) => {
                if (rest.isMulti) {
                    if (!ref.state.value) {
                        return [];
                    }

                    return ref.state.value.map((option: OptionTypeBase) => option.value);
                }
                if (!ref.state.value) {
                    return '';
                }
                return ref.state.value.value;
            },
            clearValue: (ref) => {
                if (!notCleaning) {
                    ref.select.clearValue();
                } else {
                    ref.select.setValue({ value: 'null', label: 'Ambos' });
                }
            },
            setValue: (ref, value) => {
                ref.select.setValue(value);
            },
        });
    }, [fieldName, notCleaning, registerField, rest.isMulti]);

    return (
        <Container isErrored={!!error} style={{ width: biggerWidth ? '105%' : '100%' }}>
            <ReactSelect
                defaultValue={defaultValue}
                ref={selectRef}
                classNamePrefix="react-select"
                options={selectOptions}
                className="input-area"
                theme={customTheme}
                styles={customStyles}
                noOptionsMessage={() => 'Não há opções disponíveis'}
                {...rest}
            />
            <label className="label">{label}</label>

            {/* {error && (
                <Error title={error}>
                    <FiAlertCircle color="#c53030" size={20} />
                </Error>
            )} */}
        </Container>
    );
};

export default Select;
