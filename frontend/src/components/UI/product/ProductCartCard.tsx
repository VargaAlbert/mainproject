"use client"

import React from 'react';
import { useShopContext } from '@/services/providers/ShopContext';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';
import { formatPrice } from '@/utils/formatPrice';
import ProductNumberInput from '@/components/UI/product/ProductNumberInput'
export default function ProductCartCard({ id, quantity }: CartItemT) {

    const { data, productAddCart } = useShopContext();

    const item: productT | undefined = data.find((item) => item.productid === id);

    if (!item) {
        return null;
    }

    const {
        productid,
        product,
        description,
        img,
        price,
        category,
    } = item;

    const handleChange = (value: number | null) => {
        const newValue = value ?? 1
        productAddCart(newValue, id, false);
    }

    const quantityPrice = quantity * price

    return (
        <Card className="flex h-42 m-3">
            <CardMedia
                component="img"
                className="w-2/5"
                image={img}
                alt={`img-${productid}`}
            />
            <Box className="flex flex-col w-3/5">

                <CardContent className="flex-1 ">
                    <Typography component="div">
                        <p className='text-xs'>{product}</p>
                    </Typography>

                    <Typography
                        variant="subtitle1"
                        component="div"
                        className='flex justify-between'
                    >
                        <Box color="text.secondary">
                            {formatPrice(price)} Ft
                        </Box>
                        <Box>
                            {formatPrice(quantityPrice)} Ft
                        </Box>
                    </Typography>

                </CardContent>

                <Box className="flex items-center justify-center pl-1 pb-1">
                    <ProductNumberInput value={quantity} onChange={handleChange} />
                </Box>
            </Box>
        </Card>
    )
}
