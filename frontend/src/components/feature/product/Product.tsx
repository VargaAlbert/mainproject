"use client"

import React from 'react'
import useFetchData from "@/hooks/useFetchProducts";

type propT = {
    category?: string
}

export default function Product({ category }: propT) {
    const { data, loading, error } = useFetchData();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    console.warn(category)

    return (
        <div>
            <h1>Data:</h1>
            <ul>
                {category ?
                    data.filter((item) => item.category === category).map((item, index) => (
                        <li key={index}>{item.product}</li>
                    )) :
                    data.map((item, index) => (
                        <li key={index}>{item.product}</li>
                    ))
                }
            </ul>
        </div>
    );
};

//.filter((item) => item.category === category).