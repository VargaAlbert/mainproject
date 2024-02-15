import React from 'react'
import Product from '@/components/feature/product/Product'

type paramsT = {
    params: {
        category: string
    }
}

export default function ProductsPage({ params }: paramsT) {
    return (
        <div>


            <Product category={params.category} />


        </div>
    )
}
