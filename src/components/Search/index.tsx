/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SearchBox } from './search-box';

interface Props {
    minimal?: boolean;
    showButtonText?: boolean;
    onSubmit?: () => void;
    [key: string]: unknown;
}

const Search: React.FC<Props> = ({ onSubmit, ...props }) => {
    const [valueSearchBox, setValueSearchBox] = useState('');
    const history = useHistory();

    const handleSubmit = useCallback(() => {
        history.push({
            pathname: `/allServicesProvider/`,
            state: valueSearchBox,
        });
    }, [valueSearchBox]);

    const handleOnChange = useCallback((e: any) => {
        e.preventDefault();
        setValueSearchBox(e.target.value);
    }, []);

    return (
        <SearchBox
            onEnter={() => {}}
            onChange={(e) => handleOnChange(e)}
            onSubmit={handleSubmit}
            value={valueSearchBox}
            name="search"
            placeholder="Pesquise os serviços por aqui "
            {...props}
        />
    );
};

export default Search;
