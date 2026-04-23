import React from 'react'
import { Navigate } from 'react-router-dom'

function Protectedroute({ children }) {

    const token = localStorage.getItem("mytoken")
    if (!token) {
        return <Navigate to="/login" />
    }
    return children
}

export default Protectedroute