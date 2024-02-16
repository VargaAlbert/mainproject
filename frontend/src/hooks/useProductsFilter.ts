import { useMemo } from 'react';

/**
 * A custom hook for filtering products based on a given filter.
 * The productT definition can be found in @/services/types.d.ts
 * 
 * @param {productT[]} products - The array of products to filter.
 * @param {filterT} filter - The filter object to apply.
 * @returns {productT[]} - The filtered array of products.
 * @example
 * const filteredProducts = useProductsFilter(allProducts, { category: 'Electronics' });
 */
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