import axios from "axios";

export const Api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export const login = (identifier: string, password: string) => {
    return Api.post("/auth/login", { identifier, password });
};

export const authUser = (token: string) => {
    return Api.get("/auth/auth-user", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
