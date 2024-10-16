import { AuthStatus } from "@/@types/user-status";
import { createContext } from "react";

interface InitialValue {
    user: User | null;
    setUser: (user: User | null) => void;
    status: AuthStatus;
    setStatus: (status: AuthStatus) => void;
}

const initialValue: InitialValue = {
    user: null,
    setUser: () => {},
    status: AuthStatus.Pending,
    setStatus: () => {},
};

export const AuthContext = createContext<InitialValue>(initialValue);
