"use client";

import { AuthStatus } from "@/@types/user-status";
import { AuthContext } from "@/contexts/auth-context";
import { authUser } from "@/libs/axios";
import { useEffect, useState } from "react";

interface Props {
    children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
    const [status, setStatus] = useState<AuthStatus>(AuthStatus.Pending);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const access_token = localStorage.getItem("access_token");

        if (access_token) {
            (async () => {
                try {
                    const { data } = await authUser(access_token);
                    setUser(data);
                    setStatus(AuthStatus.Authenticated);
                } catch (error) {
                    console.log(error);
                    setStatus(AuthStatus.Unauthenticated);
                }
            })();
        } else {
            setStatus(AuthStatus.Unauthenticated);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, status, setStatus }}>
            {children}
        </AuthContext.Provider>
    );
}
