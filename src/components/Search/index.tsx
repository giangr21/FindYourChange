/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { SearchBox } from './search-box/search-box';

interface Props {
    minimal?: boolean;
    showButtonText?: boolean;
    onSubmit?: () => void;
    [key: string]: unknown;
}

const Search: React.FC<Props> = ({ onSubmit, ...props }) => {
    // const searchTerm = useAppState('searchTerm');
    // const dispatch = useAppDispatch();
    // const router = useRouter();
    // const intl = useIntl();

    // const handleOnChange = (e) => {
    //     const { value } = e.target;
    //     dispatch({ type: 'SET_SEARCH_TERM', payload: value });
    // };
    // const { pathname, query } = router;
    // const onSearch = (e) => {
    //     e.preventDefault();
    //     const { type, ...rest } = query;
    //     if (type) {
    //         router.push(
    //             {
    //                 pathname,
    //                 query: { ...rest, text: searchTerm },
    //             },
    //             {
    //                 pathname: `/${type}`,
    //                 query: { ...rest, text: searchTerm },
    //             },
    //         );
    //     } else {
    //         router.push({
    //             pathname,
    //             query: { ...rest, text: searchTerm },
    //         });
    //     }
    //     dispatch({ type: 'SET_SEARCH_TERM', payload: '' });
    //     if (onSubmit) {
    //         onSubmit();
    //     }
    // };
    return (
        <SearchBox
            onEnter={() => {}}
            onChange={() => {}}
            value=""
            name="search"
            placeholder="Pesquise os serviços por aqui "
            {...props}
        />
    );
};

export default Search;
