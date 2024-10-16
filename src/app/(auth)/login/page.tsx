"use client";

import { AuthStatus } from "@/@types/user-status";
import { AuthContext } from "@/contexts/auth-context";
import { login } from "@/libs/axios";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function Page() {
    const { setUser, setStatus } = useContext(AuthContext);
    const router = useRouter();

    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        try {
            const { data } = await login(identifier, password);

            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
            setUser(data.user);
            setStatus(AuthStatus.Authenticated);
            router.replace("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className='flex flex-col gap-2 max-w-xs w-full' onSubmit={onSubmit}>
            <input
                className='border p-1.5 rounded-sm'
                placeholder='Identifier'
                type='text'
                onInput={(e) => setIdentifier(e.currentTarget.value)}
            />
            <input
                className='border p-1.5 rounded-sm'
                placeholder='Password'
                type='password'
                onInput={(e) => setPassword(e.currentTarget.value)}
            />
            <button
                type='submit'
                className='border p-1 rounded-sm bg-blue-500 hover:brightness-90 transition-all text-white font-medium'>
                Login
            </button>
        </form>
    );
}
