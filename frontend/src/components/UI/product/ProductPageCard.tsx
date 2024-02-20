"use client"

import React from 'react';

import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    IconButton
} from '@mui/material';

import { Favorite } from '@mui/icons-material/';
import { formatPrice } from '@/utils/formatPrice';

type propT = {
    item: productT
}

export default function ProductPageCard({ item }: propT) {

    const {
        productid,
        product,
        description,
        img,
        price,
        category,
    } = item;

    return (
        <Card className='max-w-sm h-full flex flex-col justify-between transform hover:scale-105 transition-transform duration-300 ease-in-out'>
            <CardMedia
                component="img"
                alt={`img-${productid}`}
                height="140"
                image={img}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {product}
                </Typography>
                <Typography variant="h4" className="text-white">
                    {formatPrice(price)} Ft
                </Typography>
            </CardContent>
            <CardActions>
                <Button className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">Kosárba</Button>
                <IconButton size="small">
                    <Favorite className="text-4xl text-primary-600" />
                </IconButton>
            </CardActions>
        </Card>
    );
}