import React from 'react';
import { FaCheck, FaSearch } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import Drawer, { ANCHOR } from '../../Drawer/Drawer';

import { CloseButton, SidebarWrapper, ContentSearch } from './styles';
import { ArrowLeftRound } from '../../Header/ProviderAuthenticate/mobile/Icons/ArrowLeftRound';
import Input from '../../Input/MainSearchInput';
import Radio from '../../Radio';
import { FooterFilter } from '../../../pages/Marketplace/styles';
import IconButton from '../../Button/IconButton';

interface MobileProps {
    isDrawerOpen: boolean;
    toggleFilter: () => void;
    cities: any;
    formRef: any;
    clearFilter: () => void;
    formFilterSubmit: (filterT: any) => Promise<void>;
}

const MobileHeader: React.FC<MobileProps> = ({
    isDrawerOpen,
    toggleFilter,
    cities,
    formRef,
    clearFilter,
    formFilterSubmit,
}) => {
    return (
        <Drawer
            isOpen={isDrawerOpen}
            anchor={ANCHOR.left}
            onClose={toggleFilter}
            overrides={{
                Root: {
                    style: {
                        zIndex: '1',
                    },
                },
                DrawerBody: {
                    style: {
                        marginRight: '0',
                        marginLeft: '0',
                        '@media only screen and (max-width: 989px)': {
                            marginLeft: '15px',
                            marginRight: '15px',
                        },
                    },
                },
                DrawerContainer: {
                    style: {
                        width: '270px',
                        '@media only screen and (max-width: 767px)': {
                            width: '75%',
                        },
                    },
                },
                Close: {
                    component: () => (
                        <CloseButton onClick={toggleFilter}>
                            <ArrowLeftRound />
                        </CloseButton>
                    ),
                },
            }}
        >
            <SidebarWrapper>
                <ContentSearch ref={formRef} onSubmit={formFilterSubmit}>
                    <p>Filtro MarketPlace</p>
                    <Input name="name" icon={FaSearch} placeholder="Pesquisar Marketplace" />
                    <div className="separator" />
                    <span>Cidades: </span>
                    <div
                        style={{
                            marginTop: '5px',
                        }}
                    >
                        <Radio
                            style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                // alignItems: 'center',
                                // justifyContent: 'center',
                            }}
                            name="cities"
                            options={cities}
                        />
                    </div>
                    <div className="separator" />
                    <span>Categoria: </span>
                    <div
                        style={{
                            marginTop: '5px',
                        }}
                    >
                        <Radio
                            style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                            name="category"
                            options={[
                                {
                                    id: 'Todas',
                                    label: 'Todas',
                                },
                                { id: 'Tatuagem', label: 'Tatuagem' },
                                { id: 'BodyPiercing', label: 'Piercing' },
                                { id: 'Barbearia', label: 'Barbearia' },
                            ]}
                        />
                    </div>
                    <div className="separator" />
                    <span>Preço: </span>
                    <div
                        style={{
                            marginTop: '5px',
                        }}
                    >
                        <Radio
                            style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                            name="price"
                            options={[
                                {
                                    id: 'Todos',
                                    label: 'Todos',
                                },
                                { id: '50-100', label: '$50 - $100' },
                                { id: '100-150', label: '$100 - $150' },
                                { id: '150-200', label: '$150 - $200' },
                                { id: '200-250', label: '$200 - $250' },
                                { id: '250+', label: '$250 +' },
                            ]}
                        />
                    </div>
                </ContentSearch>
                <FooterFilter>
                    <IconButton icon={MdDeleteForever} title="Limpar" background="#777777" action={clearFilter} />
                    <IconButton
                        icon={FaCheck}
                        title="Aplicar"
                        background="#00A57C"
                        action={() => formRef.current?.submitForm()}
                    />
                </FooterFilter>
            </SidebarWrapper>
        </Drawer>
    );
};

export default MobileHeader;
