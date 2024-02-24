"use client"

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    ChangeEvent,
} from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

import {
    initAuth,
    initFilter
} from "../initConfig";
import useFetchData from "@/hooks/useFetchProducts";
import useProductsFilter from "@/hooks/useProductsFilter";
import useUserInterfaceDisplay from "@/hooks/useUserInterfaceDisplay";
import useProductAddCart from "@/hooks/useProductsAddCart";
import usePagination from "@/hooks/usePagination";

type ShopProviderProps = {
    children: ReactNode;
};

export interface ShopContextProps {
    setPersist: React.Dispatch<React.SetStateAction<boolean>>;
    setAuth: React.Dispatch<React.SetStateAction<authT>>;
    setFilters: React.Dispatch<React.SetStateAction<filterT>>;


    productAddCart: (quantityOfProduct: number, id: string, isSelfIncrease: boolean) => void;
    setUserInterface: (key: string, value: boolean) => void;
    removeFromCart: (id: string) => void;
    toggleDrawer: (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;

    /* ---------- */
    page: number
    currentPage: number;
    maxPage: number;
    count: number;
    nextPage: () => void;
    prevPage: () => void;
    jumpPage: (page: number) => void;
    currentData: () => productT[];
    numberOfPage: () => number;
    handleChange: (event: React.ChangeEvent<unknown>, page: number) => void
    /* ---------- */


    cartItems: CartItemT[];
    data: productT[];
    products: productT[];

    filters: filterT;
    userInterfaceDisplay: uiObjT;
    auth: authT;

    error: string | null;

    persist: boolean;
    loading: boolean;
};

export const ShopContext = createContext({} as ShopContextProps)

export const useShopContext = () => {
    return useContext(ShopContext);
};

export const ShopProvider: React.FC<ShopProviderProps> = ({
    children
}) => {

    const [auth, setAuth] = useState<authT>(initAuth);
    const [filters, setFilters] = useState<filterT>(initFilter)

    const [persist, setPersist] = useLocalStorage<boolean>("persist", false);

    const { userInterfaceDisplay, setUserInterface, toggleDrawer } = useUserInterfaceDisplay();

    const { data, loading, error } = useFetchData();

    const { cartItems, productAddCart, removeFromCart } = useProductAddCart();

    const products = useProductsFilter(data, filters);

    const { currentPage, maxPage, page, count, nextPage, prevPage, jumpPage, currentData, numberOfPage, handleChange } = usePagination(products, 6);

    const contextValue: ShopContextProps = {
        setUserInterface,
        userInterfaceDisplay,
        setAuth,
        auth,
        persist,
        setPersist,
        filters,
        setFilters,
        products,
        data,
        loading,
        error,
        cartItems,
        productAddCart,
        removeFromCart,
        toggleDrawer,
        /* ------ */
        currentPage,
        maxPage,
        page,
        count,
        nextPage,
        prevPage,
        jumpPage,
        currentData,
        numberOfPage,
        handleChange,
        /* ------ */
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContext;