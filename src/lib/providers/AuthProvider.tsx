import { createContext, useEffect, useState } from "react";
import React from "react"; // Make sure to import React
import { deleteCookie, getCookie } from "../../utils/functions/cookie";
import { useMutation } from "@tanstack/react-query";
import { authUser, signOut as signOutFn } from "../../api/authApi";
import { ENV } from "../config/environment";

export type User = {
    avatar_url?: string;
    email?: string;
    email_verified?: boolean;
    full_name?: string;
    iss?: string;
    name?: string;
    phone_verified?: boolean;
    picture?: string;
    preferred_username?: string;
    provider_id?: string;
    sub?: string;
    user_name?: string;
};

const AuthInitialState = {
    accessToken: null,
    providerToken: null,
    refreshToken: null,
    tokenType: null,
    isLoggedIn: false,
    user: null,
};

export interface AuthContextType {
    auth: {
        accessToken: string | null;
        providerToken: string | null;
        refreshToken: string | null;
        tokenType: string | null;
        isLoggedIn: boolean;
        user: User | null;
    };
    setAuth: React.Dispatch<
        React.SetStateAction<{
            accessToken: string | null;
            providerToken: string | null;
            refreshToken: string | null;
            tokenType: string | null;
            isLoggedIn: boolean;
            user: User | null;
        }>
    >;
    signOut: () => void;
}

// Step 3: Create a context
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);

    // Coba dapatkan nilai dari hash URL atau cookie sebagai cadangan
    const accessToken = params.get("access_token") || getCookie("accessToken");
    const expiresIn = params.get("expires_in") || null;
    const providerToken =
        params.get("provider_token") || getCookie("providerToken");
    const refreshToken =
        params.get("refresh_token") || getCookie("refreshToken");
    const tokenType = params.get("token_type") || getCookie("tokenType");
    const isLoggedIn = ENV.environtment == "dev";

    if (expiresIn) {
        // Simpan parameter ke dalam cookie jika ada
        if (accessToken)
            document.cookie = `accessToken=${accessToken};max-age=${expiresIn}`;
        if (expiresIn)
            document.cookie = `expiresIn=${expiresIn};max-age=${expiresIn}`;
        if (providerToken)
            document.cookie = `providerToken=${providerToken};max-age=${expiresIn}`;
        if (refreshToken)
            document.cookie = `refreshToken=${refreshToken};max-age=${expiresIn}`;
        if (tokenType)
            document.cookie = `tokenType=${tokenType};max-age=${expiresIn}`;
    }

    // Setelah memproses parameter, hapus hash dari URL
    window.history.replaceState(null, "", window.location.pathname);

    // Gunakan state untuk menyimpan parameter dalam konteks
    const [auth, setAuth] = useState({
        accessToken,
        providerToken,
        refreshToken,
        tokenType,
        isLoggedIn,
        user:
            ENV.environtment != "dev"
                ? (null as User | null)
                : ({
                      avatar_url:
                          "https://lh3.googleusercontent.com/a/ACg8ocKq3_DW5eATNKeffA5ligbHzlf0ytjrvElgoj2zQiiW3mfEQdNn=s96-c",
                      email: "sina4science@gmail.com",
                      email_verified: true,
                      full_name: "Anis Fajar Fakhruddin",
                      iss: "https://accounts.google.com",
                      name: "Anis Fajar Fakhruddin",
                      phone_verified: false,
                      picture:
                          "https://lh3.googleusercontent.com/a/ACg8ocKq3_DW5eATNKeffA5ligbHzlf0ytjrvElgoj2zQiiW3mfEQdNn=s96-c",
                      preferred_username: "sinascience",
                      provider_id: "100539455116914945683",
                      sub: "100539455116914945683",
                      user_name: "sinascience",
                  } as User | null),
    });

    const authUserMutation = useMutation({
        mutationFn: authUser,
        mutationKey: ["authUser"],
        onSuccess: (data) => {
            let isLoggedIn = auth.isLoggedIn;
            let user: User | null;
            if (data.aud && data.aud == "authenticated") {
                isLoggedIn = true;
                if (data.user_metadata) {
                    user = data.user_metadata as User;
                }
                setAuth((prevState) => ({
                    ...prevState,
                    isLoggedIn,
                    user: user,
                }));
            }
        },
        onError: (error) => {
            console.error(error);
        },
    });

    const signOutMutation = useMutation({
        mutationFn: signOutFn,
        mutationKey: ["signOut"],
        onSuccess: () => {
            setAuth(AuthInitialState);
            DeleteAuthCookie();
        },
        onError: (error) => {
            console.error(error);
        },
    });

    const signOut = () => {
        return signOutMutation.mutate();
    };

    useEffect(() => {
        if (ENV.environtment == "dev") {
            return;
        }
        if (auth.accessToken) {
            authUserMutation.mutate();
        } else {
            setAuth((prevState) => ({ ...prevState, isLoggedIn: false }));
        }
    }, [auth.accessToken]);

    return (
        <AuthContext.Provider value={{ auth, setAuth, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

const DeleteAuthCookie = () => {
    deleteCookie("accessToken");
    deleteCookie("expiresIn");
    deleteCookie("providerToken");
    deleteCookie("refreshToken");
    deleteCookie("tokenType");
};
