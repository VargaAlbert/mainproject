"use client"

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useShopContext } from '@/services/providers/ShopContext';

import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import useRefreshToken from "@/hooks/useRefreshToken";

export default function Users() {

    const { handleChangeUIObj } = useShopContext();

    const [users, setUsers] = useState<userT[]>([]);
    const axiosPrivate = useAxiosPrivate();
    const router = useRouter();
    const effectRun = useRef(false);
    const refresh = useRefreshToken();

    const handleLogouth = () => {
        handleChangeUIObj('loginModal', true);
    }

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