"use client"

import { useRef, useState, useEffect } from 'react';
import { useShopContext } from "@/services/providers/ShopContext";
import { useRouter } from 'next/navigation';
import axios from '@/services/api/axiosConfig';

import useInput from '@/hooks/useInput';
import useToggle from '@/hooks/useToggle';

import Button from '@/components/UI/authentication/Button';
import LinkButton from '@/components/UI/LinkButton';


const LOGIN_URL = '/auth';

export default function LoginForm() {

    const userRef = useRef<HTMLInputElement | null>(null);
    const errRef = useRef<HTMLParagraphElement | null>(null);

    const { auth, setAuth, handleChangeUIObj } = useShopContext();

    const router = useRouter();

    const [user, resetUser, userAttribs] = useInput('user', '')
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [check, toggleCheck] = useToggle('persist', false);

    useEffect(() => {
        const currentElement = userRef.current;
        if (currentElement instanceof HTMLParagraphElement) {
            currentElement.focus();
        }
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({
                user,
                roles,
                accessToken,
            });
            resetUser();
            setPwd('');
            router.replace("/");

        } catch (err: any) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            const currentElement = userRef.current;
            if (currentElement instanceof HTMLParagraphElement) {
                currentElement.focus();
            }
        }
    }

    const handleCloseUserMenu = () => {
        handleChangeUIObj('loginModal', false);
    }

    return (
        <>
            {auth?.accessToken ? (
                <section className='text-center'>
                    <h1 className='pb-5 text-3xl'>Sikeres Bejelentkezés!</h1>
                    <h3>Jó vásárlást kivánunk.</h3>
                </section>
            ) : (
                <section>
                    <p
                        ref={errRef}
                        className={errMsg ? "errmsg" : "offscreen"}
                        aria-live="assertive">{errMsg}
                    </p>

                    <h1 className="text-xl pb-7 font-bold leading-tight tracking-tight md:text-2xl text-white">
                        Sign in to your account
                    </h1>
                    <form
                        className="space-y-4 md:space-y-6"
                        onSubmit={handleSubmit}>
                        <div >
                            <label className='inputLabel' htmlFor="username">Username:</label>
                            <input
                                className='imputClass'
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                {...userAttribs}
                                required
                            />
                        </div>
                        <div>
                            <label className='inputLabel' htmlFor="password">Password:</label>
                            <input
                                className='imputClass'
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="remember"
                                        onChange={toggleCheck}
                                        checked={check}
                                        aria-describedby="remember"
                                        type="checkbox"
                                        className="w-4 h-4 border rounded focus:ring-1 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-primary-800"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="remember" className="text-gray-300">Remember me</label>
                                </div>
                            </div>
                            <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                        </div>

                        <Button
                            label='Sign In'
                        />
                    </form>
                    <LinkButton
                        label='Registráció'
                        href='/registration'
                        onClick={handleCloseUserMenu}
                    />
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            <a href="#">Sign Up</a>
                        </span>
                    </p>
                </section >
            )
            }
        </>
    )
}
