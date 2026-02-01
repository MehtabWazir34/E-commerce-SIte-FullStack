import { createContext, useContext, useEffect, useState } from "react";
import { checkLogin } from "./authCheck";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true; // safety for StrictMode
        const initAuth = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    if (isMounted) {
                        setLoggedIn(false);
                        setLoading(false);
                    }
                    return;
                }
                const res = await checkLogin()
                if (isMounted) {
                    setLoggedIn(res.data?.LoggedIn === true);
                }
            } catch (err) {
                if (isMounted) {
                    setLoggedIn(false);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        initAuth();

        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) return <h1>Loading...</h1>;

    return (
        <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
