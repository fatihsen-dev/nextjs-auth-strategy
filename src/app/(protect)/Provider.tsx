"use client";

import { AuthStatus } from "@/@types/user-status";
import Loading from "@/components/Loading";
import { AuthContext } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

interface Props {
    children: React.ReactNode;
}

export default function Provider({ children }: Props) {
    const { status } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (status === AuthStatus.Unauthenticated) {
            router.replace("/login");
        }
    }, [status]);

    if (status !== AuthStatus.Authenticated) {
        return <Loading />;
    } else {
        return <>{children}</>;
    }
}
