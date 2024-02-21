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

  const [value, setValue] = useState<number>(1);

  console.log(cartItems);
  const handleChange = (newValue: number | null) => {
    setValue(newValue ?? 1);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button onClick={toggleDrawer('right', true)}>Kosárba</Button>
      <ProductNumberInput value={value} onChange={handleChange} />
    </main>
  );
}
