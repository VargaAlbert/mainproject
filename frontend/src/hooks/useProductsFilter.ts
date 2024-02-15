import { useMemo } from 'react';

const useProductsFilter = (
    products: productT[],
    filter: filterT
    ) => {

    const memoizedProductsFilter  = useMemo(() => {
        console.log("ez a fontos",filter)
        const copyProducts: productT[] = [...products];
        const { category } = filter;

        console.log("104", copyProducts)
        if(category){
            return copyProducts.filter((item) => item.category === category)
        }

        return copyProducts
    },[filter, products, products.length]);

    return memoizedProductsFilter
}

export default useProductsFilter;