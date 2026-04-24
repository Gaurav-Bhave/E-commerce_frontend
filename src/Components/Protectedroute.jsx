import React from 'react'
import { Navigate } from 'react-router-dom'
import { Myuseauth } from '../Context/Authcontext'

function Protectedroute({ children }) {

    const {mytoken} = Myuseauth();

    if (!mytoken) {
        return <Navigate to="/login" />
    }
    return children
}

export default Protectedroute