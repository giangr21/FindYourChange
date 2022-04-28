/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import {
    ProductCardWrapper,
    ProductImageWrapper,
    ProductInfo,
    Image,
    ProductTitle,
    ProductDescriptionWrapper,
    ProductDescription,
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
    const hasDiscount = serviceData.disccount !== '' && serviceData.disccount !== '0';

    return (
        <>
            <ProductCardWrapper onClick={() => handleEdit(serviceData.id)} className="product-card">
                <ProductImageWrapper>
                    <Image url={serviceData.image} className="product-image" />
                    {hasDiscount && (
                        <>
                            <SaleTag>Promoção</SaleTag>
                            <DiscountPercent>{serviceData.disccount}% Off</DiscountPercent>
                        </>
                    )}
                </ProductImageWrapper>
                <ProductInfo>
                    <ProductTitle>{serviceData.title}</ProductTitle>
                    <ProductDescriptionWrapper>
                        <ProductDescription>{serviceData.description}</ProductDescription>
                    </ProductDescriptionWrapper>
                    <ProductMeta>
                        <ProductPriceWrapper>
                            <ProductPrice>
                                {Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                }).format(
                                    Number(
                                        hasDiscount
                                            ? serviceData.totalValueWithDisccount
                                            : serviceData.value,
                                    ),
                                )}
                            </ProductPrice>

                            {hasDiscount && (
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
