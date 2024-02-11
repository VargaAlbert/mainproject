import { useMemo } from 'react';

const useProductsFilter = (
    products: productT[],
    filter: filterT
    ) => {

    const memoizedProductsFilter  = useMemo(() => {
        const copyProducts: productT[] = [...products];
        const { category } = filter

        console.log("104",category)
        if(category){
            return copyProducts.filter((item) => item.category === category)
        }

        return copyProducts
    },[filter]);

    return memoizedProductsFilter
}

export default useProductsFilter;