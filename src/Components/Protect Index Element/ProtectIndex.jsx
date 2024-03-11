import React from 'react'
import { useToken } from '../Context/TokenContext';
import Home from '../Home/Home';
import Login from '../Login/Login';

export default function ProtectIndex() {
    const { token } = useToken();
    if (token) {
        return <Home/>
    } else {
        return <Login/>
    }
}
