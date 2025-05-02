'use client'
import { createContext, ReactNode, useEffect, useState } from 'react';
import { Toaster, toast } from "react-hot-toast";
import { SessionProvider, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLocalStorage } from '@/helpers/useLocalStorage';

type values = {
    popup: { type: string, msg: string };
    loading: boolean;
    login: (email: string, password: string, callbackUrl: string) => void; 
    logOut: () => void;
}

export const AuthContext = createContext({} as values);

const AuthProvider = ({ children }: { children: ReactNode}) => {
    const [user, setUser] = useLocalStorage("user", null);
    const [popup, setPopup] = useState({ type: "", msg: "" });
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const formatError = (msg: string) => {
        return msg.replace("-", " ").replace(")", "")
    }

    const login = async (email: string, password: string, callbackUrl: string) => {
        setLoading(true)
        const res = await signIn("credentials", { email, password, redirect: false });
        if(res?.ok) {
            setPopup({ type: "success", msg: "Login Successful" })
            setLoading(false)
            router.push(callbackUrl ? callbackUrl : "/admin")
        }
        if(res?.error) {
            setPopup({ type: "error", msg: formatError(res.error as string) })
            setLoading(false)
        }
    }

    const logOut = () => {
        setUser(null)
        signOut()
        .then(() => {
            router.push("/login")
        })
        .catch((e) => {
            setPopup({ type: "error", msg: "Couldn't sign out, please try again." })
        })
    }

    useEffect(() => {
        if (popup?.type === "success") {
            toast.success(popup.msg)
        }
        if (popup?.type === "error") {
            toast.error(popup.msg);
        }
      }, [popup]);

    return (
        <AuthContext.Provider value={{ popup, loading, login, logOut }}>
            <Toaster containerClassName="p-8" />
            <SessionProvider>
                {children}
            </SessionProvider>
        </AuthContext.Provider>
    );
}

export default AuthProvider;