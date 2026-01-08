import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = localStorage.getItem("token");

                if (!storedUser) {
                    setUser(null);
                } else {
                    const { data } = await api.get("/users/profile");
                    setUser(data);
                }
            } catch (error) {
                console.error("Auth error:", error);
                setUser(null);
            } finally {
                setLoading(false); // 🔥 ALWAYS runs
            }
        };

        loadUser();
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
