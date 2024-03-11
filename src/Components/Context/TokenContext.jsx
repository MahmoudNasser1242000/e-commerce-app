import React, { createContext, useContext, useEffect, useState } from 'react'

const tokenContext = createContext();
const initialTokenValue = localStorage.getItem("userToken")? localStorage.getItem("userToken") : "";
const initialUserValue = localStorage.getItem("userInfo")? JSON.parse(localStorage.getItem("userInfo")) : "";
export default function TokenContextProvider({ children }) {
    const [token, setToken] = useState(initialTokenValue);
    const [user, setUser] = useState(initialUserValue);
console.log(user);
    useEffect(() => {
        if (token !== "") {
            localStorage.setItem("userToken", token)
        } else {
            localStorage.removeItem("userToken")
        }

        if (user !== "") {
            localStorage.setItem("userInfo", JSON.stringify(user))
        } else {
            localStorage.removeItem("userInfo");
        }
    }, [token, user])

    const addToken = (token) => { 
        setToken(token);
    }

    const removeToken = () => { 
        setToken("");
        setUser("")
    }
    return (
        <tokenContext.Provider value={{ token, removeToken, addToken, setToken, user, setUser }}>{children}</tokenContext.Provider>
    )
}

export function useToken() {
    return useContext(tokenContext)
}