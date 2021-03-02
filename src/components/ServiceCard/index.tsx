import React from 'react';
import {
    ProductCardWrapper,
    ProductImageWrapper,
    ProductInfo,
    Image,
    ProductTitle,
    ProductWeight,
    ProductMeta,
    OrderID,
    ProductPriceWrapper,
    ProductPrice,
    DiscountedPrice,
} from './styles';

type ProductCardProps = {
    title: string;
    image: any;
    weight?: string;
    currency?: string;
    description?: string;
    price: number;
    salePrice?: number;
    orderId?: number;
    discountInPercent?: number;
    data: any;
};

const ProductCard: React.FC<ProductCardProps> = ({
    title,
    image,
    weight,
    price,
    salePrice,
    discountInPercent,
    currency,
    data,
    orderId,
    ...props
}) => {
    return (
        <>
            <ProductCardWrapper {...props} className="product-card">
                <ProductImageWrapper>
                    <Image url={image} className="product-image" />
                </ProductImageWrapper>
                <ProductInfo>
                    <ProductTitle>{title}</ProductTitle>
                    <ProductWeight>{weight}</ProductWeight>
                    <ProductMeta>
                        <ProductPriceWrapper>
                            <ProductPrice>
                                {currency}
                                {salePrice && salePrice !== 0 ? salePrice : price}
                            </ProductPrice>
                        </ProductPriceWrapper>

                        <OrderID>{orderId}</OrderID>
                    </ProductMeta>
                </ProductInfo>
            </ProductCardWrapper>
        </>
    );
};

export default ProductCard;
