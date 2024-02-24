"use client"

import React from 'react'
import Product from '@/components/feature/product/Product'
import { Pagination } from '@mui/material'
import { useShopContext } from '@/services/providers/ShopContext';

export default function ProductsPage() {
    const { handleChange, page, count } = useShopContext();

    return (
        <Product />
    )
}