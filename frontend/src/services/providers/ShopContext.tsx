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
import useUserInterfaceDisplay from "@/hooks/useUserInterfaceDisplay";
import useProductAddCart from "@/hooks/useProductsAddCart";
import useProductsFilter, { UseProductsFilterInterface } from "@/hooks/useProductsFilter";
import usePagination, { UsePaginationInterface } from "@/hooks/usePagination";

type ShopProviderProps = {
    children: ReactNode;
};

export interface ShopContextProps
    extends
    UsePaginationInterface,
    UseProductsFilterInterface {
    setPersist: React.Dispatch<React.SetStateAction<boolean>>;
    setAuth: React.Dispatch<React.SetStateAction<authT>>;


    productAddCart: (quantityOfProduct: number, id: string, isSelfIncrease: boolean) => void;
    setUserInterface: (key: string, value: boolean) => void;
    removeFromCart: (id: string) => void;
    toggleDrawer: (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;

    cartItems: CartItemT[];
    data: productT[];

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

    const [persist, setPersist] = useLocalStorage<boolean>("persist", false);

    const { userInterfaceDisplay, setUserInterface, toggleDrawer } = useUserInterfaceDisplay();

    const { data, loading, error } = useFetchData();

    const { cartItems, productAddCart, removeFromCart } = useProductAddCart();

    const { filteredProducts, filters, setFilters } = useProductsFilter(data);
    const { page, maxPage, currentPageData, handleChangePage } = usePagination(filteredProducts, 6);

    const contextValue: ShopContextProps = {
        setUserInterface,
        userInterfaceDisplay,
        setAuth,
        auth,
        persist,
        setPersist,


        data,
        loading,
        error,
        cartItems,
        productAddCart,
        removeFromCart,
        toggleDrawer,

        /* ----- */
        filteredProducts, filters, setFilters,
        /* ------ */
        page, maxPage, currentPageData, handleChangePage,
        /* ------ */
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContext;