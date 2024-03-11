import React from 'react'
import { useToken } from '../Context/TokenContext'
import { Navigate } from 'react-router-dom';

export default function ProtectToken({children}) {
    const {token} = useToken();
    if (token) {
        return <Navigate to={"/home"}/>
    } else {
        return children
    }
}
