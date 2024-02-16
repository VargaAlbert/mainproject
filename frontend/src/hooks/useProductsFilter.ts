import { useMemo } from 'react';

const useProductsFilter = (
    products: productT[],
    filter: filterT
    ) => {

    const memoizedProductsFilter  = useMemo(() => {

        const copyProducts: productT[] = [...products];
        const { category } = filter;

        if(category){
            return copyProducts.filter((item) => item.category === category)
        }

        return copyProducts
    },[filter, products, products.length]);

    return memoizedProductsFilter
}

export default useProductsFilter;