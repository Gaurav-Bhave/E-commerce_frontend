import { createContext, useContext, useState, useMemo } from "react";
import { jwtDecode } from "jwt-decode";

const Mycontext = createContext();

export function MyAuthprovider({ children }) {

    const [mytoken, setmytoken] = useState(localStorage.getItem("myitem"))

    const user = useMemo(() => {
        if (!mytoken) return null

        try {
            const decoded = jwtDecode(mytoken)

            return {
                name: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
                email: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
                role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
            }

        } catch (err) {
            console.log(err)
            return null
        }
    }, [mytoken])

    const Login = (token) => {
        localStorage.setItem("myitem", token)
        setmytoken(token)
    }

    const Logout = () => {
        localStorage.removeItem("myitem")
        setmytoken(null)
    }

    return (
        <Mycontext.Provider value={{ mytoken, Login, Logout, user }}>
            {children}
        </Mycontext.Provider>
    )
}

export const Myuseauth = () => useContext(Mycontext)