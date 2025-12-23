import { createContext, useContext , useEffect , useState } from "react";
import api from "../api/axios"

const AuthContext = createContext();

export const AuthProvider =({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const loadUser = async()=>{
            try{
                const {data} = await api.get("/users/profile")
                setUser(data);
            }catch{
                setUser(null);
                setLoading(false);
            }finally{
                setLoading(false);
            }
        };

        if(localStorage.getItem("token")){
            loadUser();
        }
    },[]);

    const login = (token) => {
        localStorage.setItem("token",token);
    };

    const logout = ()=>{
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user,setUser,login,logout,loading}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth =()=> useContext(AuthContext);