"use client"

import React from 'react'
import useFetchData from "@/hooks/useFetchProducts";
import useProductsFilter from '@/hooks/useProductsFilter';
import { notFound } from 'next/navigation'

type propT = {
    category?: string
}

export default function Product({ category }: propT) {

    const { data, loading, error } = useFetchData();

    const products = useProductsFilter(data, { category: category })
    console.warn(products)



    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (products.length === 0) {
        notFound()
    }

    return (
        <div>
            <h1>Data:</h1>
            <ul>
                {
                    products.map((item, index) => (
                        <li key={index}>{item.product}</li>
                    ))
                }
            </ul>
        </div>
    );
};

//.filter((item) => item.category === category).