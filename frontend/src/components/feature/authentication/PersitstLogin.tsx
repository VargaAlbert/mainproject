"use client"

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import useRefreshToken from '@/hooks/useRefreshToken';
import { useShopContext } from '@/services/providers/ShopContext';

interface PersistLoginProps {
    children: React.ReactNode;
}

const PersistLogin: React.FC<PersistLoginProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useShopContext();
    const effectRun = useRef(false);

    const router = useRouter();

    useEffect(() => {
        const currentPath = window.location.pathname;
        console.log("aktuális ut", currentPath)
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                router.push(currentPath, undefined);
                setIsLoading(false);
            }
        }

        if (effectRun.current) {
            !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
        }

        return () => {
            effectRun.current = true;
        };
    }, [])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading])

    return <>{children}</>;
};

export default PersistLogin;
