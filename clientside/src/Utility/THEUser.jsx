import { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../Utility/axiosInstance.js'
const userContext = createContext()

export function THEUser({children}){

    let [theUser, setUser] = useState(null);
    let [loading, setLoading] = useState(true);

    const getUser = async()=>{
        try {
            let token = localStorage.getItem('token');
            if(!token){
                setUser(null);
                setLoading(false)
                return
            };
            let theRes = await axiosInstance.get(`/user/me`);
            setUser(theRes.data.user);

        } catch (error) {
            setUser(null);
            console.log("Failed to getUser!", error);
       } finally{
        setLoading(false)
       }
    }
    useEffect(()=>{
        getUser()
    }, []);
    const loggedIn = !!theUser;
    return(
        <userContext.Provider value={{theUser, setUser, loading, getUser, loggedIn}}>
            {children}
        </userContext.Provider>
    )
}
export const useUser = () => useContext(userContext);