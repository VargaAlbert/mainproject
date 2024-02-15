import React from 'react'
import Product from '@/components/feature/product/Product'

type paramsT = {
    params: {
        category: string
    }
}

export default function ProductsPage({ params }: paramsT) {
    return (
        <section className="mx-auto max-w-screen-2xl">
            <Product category={params.category} />
        </section>
    )
}
