"use client"

import { useRef, useState, useEffect } from 'react';
import { useShopContext } from "@/services/providers/ShopContext";
import { initLoginObj } from '@/services/initConfig';
import axios from '@/services/api/axiosConfig';

import Link from 'next/link'
import Input from '@/components/UI/authentication/Input';
import Button from '@/components/UI/authentication/Button';

const LOGIN_URL = '/auth';

export default function LoginForm() {

    const [loginObj, setLoginObj] = useState<loginObjT>(initLoginObj);

    const userRef = useRef<HTMLInputElement | null>(null);
    const errRef = useRef<HTMLParagraphElement | null>(null);

    const { setAuth } = useShopContext();


    useEffect(() => {
        const currentElement = userRef.current;
        if (currentElement instanceof HTMLParagraphElement) {
            currentElement.focus();
        }
    }, [])

    useEffect(() => {
        setLoginObj({
            ...loginObj,
            'errMsg': ''
        })
    }, [loginObj.user, loginObj.pwd])

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginObj({
            ...loginObj,
            [e.target.name]: e.target.value
        });
    }

    console.log(loginObj)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({
                    user: loginObj.user,
                    pwd: loginObj.pwd
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({
                user: loginObj.user,
                pwd: loginObj.pwd,
                roles,
                accessToken
            });
            setLoginObj({
                ...loginObj,
                'user': '',
                'pwd': '',
                'success': true,
            });
        } catch (err: any) {
            if (!err?.response) {
                setLoginObj({
                    ...loginObj,
                    errMsg: 'No Server Response'
                });
            } else if (err.response?.status === 400) {
                setLoginObj({
                    ...loginObj,
                    errMsg: 'Missing Username or Password'
                });

            } else if (err.response?.status === 401) {
                setLoginObj({
                    ...loginObj,
                    errMsg: 'Unauthorized'
                });
            } else {
                setLoginObj({
                    ...loginObj,
                    errMsg: 'Login Failed'
                });
            }
            const currentElement = userRef.current;
            if (currentElement instanceof HTMLParagraphElement) {
                currentElement.focus();
            }
        }
    }


    return (
        <>
            {loginObj.success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <Link href="/">Go to Home</Link>
                    </p>
                </section>
            ) : (
                <section>
                    <p
                        ref={errRef}
                        className={loginObj.errMsg ? "errmsg" : "offscreen"}
                        aria-live="assertive">{loginObj.errMsg}
                    </p>

                    <h1 className="text-xl pb-7 font-bold leading-tight tracking-tight md:text-2xl text-white">
                        Sign in to your account
                    </h1>
                    <form
                        className="space-y-4 md:space-y-6"
                        onSubmit={handleSubmit}>
                        <Input
                            label="Username"
                            id="username"
                            type='text'
                            name='user'
                            inputRef={userRef}
                            //autoComplete="off"
                            onChange={handleLoginChange}
                            value={loginObj.user}
                            required
                        />
                        <Input
                            label="password"
                            id="password"
                            type='password'
                            name='pwd'
                            onChange={handleLoginChange}
                            value={loginObj.pwd}
                            required
                        />

                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="remember"
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
