import { createContext, useContext, useState } from "react";


const Mycontext = createContext();

export function MyAuthprovider({ children }) {

    const [mytoken, setmytoken] = useState(localStorage.getItem("myitem"))

    const Login = (mytoken) => {
        localStorage.setItem("myitem", mytoken)
        setmytoken(mytoken)
    }

    const Logout = () => {
        localStorage.removeItem("myitem")
        setmytoken(null)
    }

    return (

        <Mycontext.Provider value={{ mytoken, Login, Logout }}>
            {children}
        </Mycontext.Provider>

    )
}

export const Myuseauth = () => useContext(Mycontext)