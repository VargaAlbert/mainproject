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

type ShopProviderProps = {
    children: ReactNode;
};

export interface ShopContextProps {
    setPersist: React.Dispatch<React.SetStateAction<boolean>>;
    setAuth: React.Dispatch<React.SetStateAction<authT>>;
    setFilters: React.Dispatch<React.SetStateAction<filterT>>;

    setUserInterface: (key: string, value: boolean) => void;

    products: productT[];
    filters: filterT;
    userInterfaceDisplay: uiObjT;
    auth: authT;
    persist: boolean;
    loading: boolean;
    error: string | null;
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

    const { userInterfaceDisplay, setUserInterface } = useUserInterfaceDisplay();

    const { data, loading, error } = useFetchData();

    const products = useProductsFilter(data, filters);

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
        loading,
        error
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContext;