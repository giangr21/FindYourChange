import React, { useCallback } from 'react';
import { SearchBox } from './search-box';

interface Props {
    minimal?: boolean;
    showButtonText?: boolean;
    valueSearchBox: string;
    setValueSearchBox: (value: any) => any;
    handleSubmit: () => any;
    [key: string]: unknown;
}

const Search: React.FC<Props> = ({ valueSearchBox, setValueSearchBox, handleSubmit, ...props }) => {
    const handleOnChange = useCallback(
        (e: any) => {
            e.preventDefault();
            setValueSearchBox(e.target.value);
        },
        [setValueSearchBox],
    );

    return (
        <SearchBox
            onEnter={handleSubmit}
            onChange={(e) => handleOnChange(e)}
            onSubmit={handleSubmit}
            value={valueSearchBox}
            name="search"
            placeholder="Pesquise um serviço"
            {...props}
        />
    );
};

export default Search;
