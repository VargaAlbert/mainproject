"use client"
import React, { useState } from 'react'
import ProductNumberInput from '@/components/UI/product/ProductNumberInput'
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton
} from '@mui/material';
import useProductAddCart from '@/hooks/useProductsAddCart';
import { useShopContext } from '@/services/providers/ShopContext';
export default function Home() {

  const { cartItems, toggleDrawer } = useShopContext();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

    </main>
  );
}
