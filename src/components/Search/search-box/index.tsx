import React from 'react';
import { SearchIcon } from './iconSearch';
import { StyledForm, StyledInput, StyledCategoryName, StyledSearchButton } from './styles';

interface Props {
    onEnter: (e: React.SyntheticEvent) => void;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onSubmit: () => any;
    value: string;
    name: string;
    minimal?: boolean;
    className?: string;
    shadow?: string;
    [key: string]: unknown;
}

export const SearchBox: React.FC<Props> = ({
    onEnter,
    onChange,
    onSubmit,
    value,
    name,
    minimal,
    className,
    shadow,
    ...rest
}) => {
    return (
        <StyledForm onSubmit={onEnter} className={className} boxShadow={shadow} minimal={minimal}>
            {minimal ? (
                <>
                    <SearchIcon style={{ marginLeft: 16, marginRight: 16, color: '#212121' }} />
                    <StyledInput type="search" onChange={onChange} value={value} name={name} {...rest} />
                </>
            ) : (
                <>
                    <StyledCategoryName>Teste</StyledCategoryName>
                    <StyledInput type="search" onChange={onChange} value={value} name={name} {...rest} />
                    <StyledSearchButton type="button" onClick={onSubmit}>
                        <SearchIcon style={{ marginRight: 10 }} />
                        Pesquisar
                    </StyledSearchButton>
                </>
            )}
        </StyledForm>
    );
};
