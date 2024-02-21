"use client"

import React, { useEffect } from 'react'
import { notFound } from 'next/navigation'
import { useShopContext } from "@/services/providers/ShopContext";

import ProductPageCard from '@/components/UI/product/ProductPageCard';

type propT = {
    category?: string
}

export default function Product({ category }: propT) {

    const {
        setFilters,
        products,
        loading,
        error
    } = useShopContext();

    useEffect(() => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            category: category
        }));
        /*         if (products.length === 0) {
                    notFound()
                } */
    }, [category, setFilters, products.length]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className='w-full p-8 grid grid-cols-1 gap-8 justify-center items-center justify-items-center md:grid-cols-2 lg:grid-cols-3 lg:gap-12 2xl:grid-cols-4'>
            {products.map((item) => (
                <ProductPageCard key={item.productid} {...item} />
            ))}
        </section>
    );
};