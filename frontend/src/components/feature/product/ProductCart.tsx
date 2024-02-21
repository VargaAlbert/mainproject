"use client"

import React from 'react'
import { useShopContext } from '@/services/providers/ShopContext';

import {
    Box,
    Drawer,
    Button,
    List,
    Divider,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material';

import ProductCartCard from '@/components/UI/product/ProductCartCard';
type prop = {
    anchor: Anchor
}

export default function ProductCart({ anchor }: prop) {

    const { cartItems } = useShopContext();

    return (
        <Box
            role="presentation"
            /*  onClick={toggleDrawer(anchor, false)} */
            /* onKeyDown={toggleDrawer(anchor, false)} */
            className="w-96"
        >
            <List>
                {cartItems.map((item) => (
                    <ProductCartCard key={item.id} {...item} />
                )).reverse()}
            </List>
        </Box>
    )
}
