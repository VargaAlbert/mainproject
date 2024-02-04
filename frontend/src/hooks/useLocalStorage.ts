import { useState, useEffect, Dispatch, SetStateAction } from "react";

const getLocalValue = <T>(key: string, initValue: T | (() => T)): T => {
    // SSR Next.js 
    if (typeof window === 'undefined') return initValue instanceof Function ? initValue() : initValue;

    // if a value is already stored 
    const localValue = JSON.parse(localStorage.getItem(key) || 'null') as T;
    if (localValue) return localValue;

    // return result of a function 
    if (initValue instanceof Function) return initValue();

    return initValue;
};

const useLocalStorage = <T>(key: string, initValue: T | (() => T)) => {
    const [value, setValue] = useState<T>(() => {
        return getLocalValue(key, initValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as [T, Dispatch<SetStateAction<T>>];
};

export default useLocalStorage;