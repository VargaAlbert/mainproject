"use client"

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import useRefreshToken from "@/hooks/useRefreshToken";
import { useShopContext } from '@/services/providers/ShopContext';

export default function Users() {

    const {
        handleChangeUIObj,
        auth,
        setAuth
    } = useShopContext();

    const [users, setUsers] = useState<userT[]>([]);
    const axiosPrivate = useAxiosPrivate();
    const router = useRouter();
    const effectRun = useRef(false);
    const refresh = useRefreshToken();

    const handleLogouth = () => {
        handleChangeUIObj('loginModal', true);
    }

    console.log("111188544", auth)
    useEffect(() => {
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users', {
                    signal: controller.signal
                });
                console.log(response.data);
                setUsers(response.data);
            } catch (err) {
                console.error(err);
                router.push('/', undefined);
                handleLogouth();
            }
        };
        if (effectRun.current) {
            getUsers();
        }

        return () => {
            controller.abort();
            effectRun.current = true;
        };
    }, []);

    const handleRefresh = () => {
        const refresh = useAxiosPrivate();
        console.log(refresh)
    }

    return (
        <article>
            <h2>Users List</h2>
            <button onClick={() => refresh()}>Refresh</button>
            {users?.length
                ? (
                    <ul>
                        {users.map((user, i) => <li key={i}>{user?.username}</li>)}
                    </ul>
                ) : <p>No users to display</p>
            }
        </article >
    );
};