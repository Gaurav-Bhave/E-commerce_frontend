import React from 'react'
import { Myuseauth } from "../Context/Authcontext"
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {

    const { Logout } = Myuseauth();

    const navigate = useNavigate();

    const handleLogout = () => {
        Logout()
        navigate("/login")

    }

    return (


        <div style={{ padding: "10px", background: "#eee" }}>


            <Link to="profile">Profile</Link>
            <Link to="orders">Orders</Link>
            <Link to="product">product</Link>

            <button onClick={handleLogout}>
                Logout
            </button>

        </div>
    )
}

export default Navbar