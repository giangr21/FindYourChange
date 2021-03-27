/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import {
    ProductCardWrapper,
    ProductImageWrapper,
    ProductInfo,
    Image,
    ProductTitle,
    ProductWeight,
    ProductMeta,
    ProductPriceWrapper,
    ProductPrice,
    DiscountedPrice,
    SaleTag,
    DiscountPercent,
} from './styles';

interface Service {
    category: string;
    description: string;
    disccount: string;
    id: string;
    image: string;
    time: string;
    title: string;
    value: string;
    totalValueWithDisccount: any;
}

type ProductCardProps = {
    serviceData: Service;
    handleEdit: (id: string) => void;
};

const ServiceCard: React.FC<ProductCardProps> = ({ serviceData, handleEdit }) => {
    return (
        <>
            <ProductCardWrapper onClick={() => handleEdit(serviceData.id)} className="product-card">
                <ProductImageWrapper>
                    <Image url={serviceData.image} className="product-image" />
                    {serviceData.disccount !== '' && serviceData.disccount !== '0' && (
                        <>
                            <SaleTag>Promoção</SaleTag>
                            <DiscountPercent>{serviceData.disccount}% Off</DiscountPercent>
                        </>
                    )}
                </ProductImageWrapper>
                <ProductInfo>
                    <ProductTitle>{serviceData.title}</ProductTitle>
                    <div
                        style={{
                            height: '50px',
                            maxHeight: '50px',
                            overflowY: 'auto',
                        }}
                    >
                        <ProductWeight>{serviceData.description}</ProductWeight>
                    </div>
                    <ProductMeta>
                        <ProductPriceWrapper>
                            <ProductPrice>
                                {serviceData.disccount !== '' && serviceData.disccount !== '0'
                                    ? Intl.NumberFormat('pt-BR', {
                                          style: 'currency',
                                          currency: 'BRL',
                                      }).format(Number(serviceData.totalValueWithDisccount))
                                    : Intl.NumberFormat('pt-BR', {
                                          style: 'currency',
                                          currency: 'BRL',
                                      }).format(Number(serviceData.value))}
                            </ProductPrice>
                            {serviceData.disccount !== '' && serviceData.disccount !== '0' && (
                                <DiscountedPrice>
                                    {Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    }).format(Number(serviceData.value))}
                                </DiscountedPrice>
                            )}
                        </ProductPriceWrapper>
                    </ProductMeta>
                </ProductInfo>
            </ProductCardWrapper>
        </>
    );
};

export default ServiceCard;
