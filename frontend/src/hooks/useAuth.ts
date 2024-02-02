"use client"
import { useContext, useDebugValue } from "react";
import ShopContext from '@/services/providers/ShopContext';

const useAuth = () => {
    const { auth } = useContext(ShopContext);
    useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
    return useContext(ShopContext);
}

export default useAuth;