"use client"

import React from 'react'
import { useShopContext } from '@/services/providers/ShopContext';

import {
    Box,
    Drawer,
    Button,
    List,
    Tooltip,
    IconButton,
    Typography
} from '@mui/material';

import { Close } from '@mui/icons-material';
import ProductCartCard from '@/components/UI/product/ProductCartCard';
type prop = {
    anchor: Anchor
}

export default function ProductCart({ anchor }: prop) {

    const { cartItems, toggleDrawer } = useShopContext();

    return (
        <Box
            role="presentation"
            /*  onClick={toggleDrawer(anchor, false)} */
            /* onKeyDown={toggleDrawer(anchor, false)} */
            className="w-96"
        >
            <Box className="w-100 h-12 bg-zinc-900 flex  flex-row">
                <Typography variant="h5" color="text.primary" className="m-auto tracking-widest">
                    KOSARAM
                </Typography>
                <Tooltip className='cursor-pointer' title="Bezárás">
                    <IconButton size="large" color="inherit" className="m-2 p-0">
                        <Close
                            className='hover:text-primary-500'
                            fontSize="large"
                            onClick={toggleDrawer(anchor, false)} />
                    </IconButton>
                </Tooltip>
            </Box>
            <List>
                {cartItems.map((item) => (
                    <ProductCartCard key={item.id} {...item} />
                )).reverse()}
            </List>
        </Box>
    )
}
