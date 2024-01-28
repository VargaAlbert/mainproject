"use client"

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    ChangeEvent,
} from "react";

import { initUiObj } from "../initConfig";

type ShopProviderProps = {
    children: ReactNode;
};


interface ShopContextProps {
    handleChangeUIObj: (key: string, value: boolean) => void;
    uiObj: uiObjT;
};

const ShopContext = createContext({} as ShopContextProps)

export const useShopContext = () => {
    return useContext(ShopContext);
};

export const ShopProvider: React.FC<ShopProviderProps> = ({
    children
}) => {

    const [uiObj, setUiObj] = useState<uiObjT>(initUiObj)

    const handleChangeUIObj = (key: string, value: boolean): void => {
        setUiObj({
            ...uiObj,
            [key]: value,
        });
    }

    const contextValue: ShopContextProps = {
        handleChangeUIObj,
        uiObj,
    };

    console.log(uiObj)
    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContext;