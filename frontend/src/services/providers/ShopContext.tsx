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
    initUiObj,
    initAuth,
    initFilter
} from "../initConfig";
import useFetchData from "@/hooks/useFetchProducts";
import useProductsFilter from "@/hooks/useProductsFilter";

type ShopProviderProps = {
    children: ReactNode;
};

const PRODUCT_CATEGORY = ["Összes termék, Botok, Kiegészítők, Orsók, Táskák és Camping, Zsinórok"]

interface ShopContextProps {
    setPersist: React.Dispatch<React.SetStateAction<boolean>>;
    setAuth: React.Dispatch<React.SetStateAction<authT>>;
    setFilters: React.Dispatch<React.SetStateAction<filterT>>;

    handleChangeUIObj: (key: string, value: boolean) => void;

    products: productT[];
    filters: filterT;
    uiObj: uiObjT;
    auth: authT;
    persist: boolean;
    loading: boolean;
    error: string | null;
};

const ShopContext = createContext({} as ShopContextProps)

export const useShopContext = () => {
    return useContext(ShopContext);
};

export const ShopProvider: React.FC<ShopProviderProps> = ({
    children
}) => {

    const [uiObj, setUiObj] = useState<uiObjT>(initUiObj)
    const [auth, setAuth] = useState<authT>(initAuth);
    const [filters, setFilters] = useState<filterT>(initFilter)

    const [persist, setPersist] = useLocalStorage<boolean>("persist", false);


    const { data, loading, error } = useFetchData();


    const products = useProductsFilter(data, filters);

    console.log("context log",products);
    const handleChangeUIObj = (key: string, value: boolean): void => {
        setUiObj({
            ...uiObj,
            [key]: value,
        });
    }


    const contextValue: ShopContextProps = {
        handleChangeUIObj,
        uiObj,
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

    console.log('context log', auth)
    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContext;