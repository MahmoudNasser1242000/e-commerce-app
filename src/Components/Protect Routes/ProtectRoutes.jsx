import React from 'react'
import { useToken } from '../Context/TokenContext'
import { Navigate } from 'react-router-dom';

export default function ProtectRoutes({ children }) {
    const { token } = useToken();
// console.log(token);
    if (token) {
        return children
    } else {
        return <Navigate to={"/login"}/>
    }

}
