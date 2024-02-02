"use client"

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    ChangeEvent,
} from "react";

import {
    initUiObj,
    initAuth
} from "../initConfig";

type ShopProviderProps = {
    children: ReactNode;
};


interface ShopContextProps {
    setAuth: React.Dispatch<React.SetStateAction<authT>>;
    handleChangeUIObj: (key: string, value: boolean) => void;
    uiObj: uiObjT;
    auth: authT;
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

    const [auth, setAuth] = useState<authT>(initAuth);

    const contextValue: ShopContextProps = {
        handleChangeUIObj,
        uiObj,
        setAuth,
        auth,
    };

    console.log(auth)
    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContext;