"use client"

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import Link from 'next/link';
import useRefreshToken from '@/hooks/useRefreshToken';

/* interface User {
    refreshToken: string[];
    username?: string | null | undefined;
    roles?: {
        User: number;
        Editor?: number | null | undefined;
        Admin?: number | null | undefined;
    } | null | undefined;
    password?: string | undefined;
} */

export default function Users() {
    const [users, setUsers] = useState<any>({});
    const axiosPrivate = useAxiosPrivate();
    const router = useRouter();
    const effectRun = useRef(false);

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
            {users?.length
                ? (
                    <ul>
                        {users.map((user: any, i: any) => <li key={i}>{user?.username}</li>)}
                    </ul>
                ) : <p>No users to display</p>
            }
        </article >
    );
};