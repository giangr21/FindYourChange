/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

interface Option {
    id: string | number;
    label: string;
}

interface Props {
    name: string;
    options: Option[];
    margin?: string;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

const Radio: React.FC<InputProps> = ({ name, options, margin = '', ...rest }) => {
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const { fieldName, registerField, defaultValue } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRefs.current,
            getValue(refs) {
                const checked = refs.find((ref: any) => ref.checked);

                return checked ? checked.value : null;
            },
            setValue(refs, value) {
                const item = refs.find((ref: any) => ref.value === value);

                if (item) {
                    item.checked = true;
                }
            },
        });
    }, [fieldName, registerField]);

    return (
        <div className="radioButton" style={rest.style}>
            {options.map((option, index) => (
                <label style={{ margin }} key={option.id}>
                    <input
                        ref={(elRef: any) => (inputRefs.current[index] = elRef)}
                        type="radio"
                        name={fieldName}
                        value={option.id}
                        defaultChecked={defaultValue === option.id}
                        onChange={rest.onChange ? rest.onChange : undefined}
                    />
                    <span>{option.label}</span>
                </label>
            ))}
        </div>
    );
};

export default Radio;
