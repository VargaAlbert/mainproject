import React from 'react'
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
export default function Home() {

  return (

    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <Button>Kosárba</Button>
      <ProductNumberInput />
    </main>
  );
}
