import React, { useEffect, useState } from 'react'
import { useNavigate , Navigate } from 'react-router-dom'


const ProtectedRoutes = (props) => {
    const {children} = props;

    const [auth , setAuth] = useState(false);
    const navigate = useNavigate();
    const [loading , setLoading] = useState(true);

    useEffect(() => {
        const user = localStorage.getItem("email");

        if (user) 
            setAuth(true);
        else 
            setAuth(false);
        setLoading(false)
    },[]);

    if (loading) {
        return (
            <h1> Wait a second!  </h1>
        )
    }

    if (auth) {
        return children;
    } 
    else {
        return <Navigate to="/" />
    }
}

export default ProtectedRoutes;