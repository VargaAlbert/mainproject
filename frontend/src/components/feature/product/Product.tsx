"use client"

import React, { useEffect, useRef } from 'react'
import { notFound } from 'next/navigation'
import { useShopContext } from "@/services/providers/ShopContext";

type propT = {
    category?: string
}

export default function Product({ category }: propT) {

    const { filters, setFilters, products, loading, error } = useShopContext();

    useEffect(() => {

        setFilters((prevFilters) => ({
            ...prevFilters,
            category: category
        }));

        if (products.length === 0) {
            notFound()
        }

    }, [category, setFilters, products.length]);

    console.log("11111", category)
    console.log("4454", filters)

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
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