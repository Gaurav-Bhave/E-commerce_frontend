import React, { useEffect, useState } from 'react'
import { Myuseauth } from "../Context/Authcontext"
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { GetAllProductFromCart } from "../Services/api"

function Navbar() {

    const { user, Logout } = Myuseauth();
    const navigate = useNavigate();

    const handleLogout = () => {
        Logout()
        navigate("/login")
    }

    const [cartcount, setcartcount] = useState(0);


    useEffect(() => {
        fetchCartData()
    }, [])

    const fetchCartData = async () => {
        const res = await GetAllProductFromCart()

        //api data
        const myresponsedata = res.data.data

        //total quantity
        let total = 0;

        myresponsedata.forEach((item) => {
            total += item.quantity
        })

        setcartcount(total)
    }

    return (

        <div style={{
            padding: "10px 20px",
            background: "#222",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        }}>

            {/* LEFT MENU */}
            <div style={{
                display: "flex",
                gap: "15px"
            }}>

                <Link
                    to="home"
                    style={{
                        color: "#fff",
                        textDecoration: "none"
                    }}
                >
                    Home
                </Link>

                <Link
                    to="profile"
                    style={{
                        color: "#fff",
                        textDecoration: "none"
                    }}
                >
                    Profile
                </Link>

                <Link
                    to="orders"
                    style={{
                        color: "#fff",
                        textDecoration: "none"
                    }}
                >
                    Orders
                </Link>

                <Link
                    to="product"
                    style={{
                        color: "#fff",
                        textDecoration: "none"
                    }}
                >
                    Product
                </Link>

            </div>



            {/* RIGHT SIDE */}
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "20px"
            }}>

                {/* CART ICON */}
                <div
                    style={{
                        position: "relative",
                        cursor: "pointer"
                    }}

                    onClick={() => navigate("/customer/cart")}
                >

                    <FaShoppingCart size={25} />

                    <span
                        style={{
                            position: "absolute",
                            top: "-10px",
                            right: "-10px",
                            background: "red",
                            color: "white",
                            borderRadius: "50%",
                            padding: "2px 7px",
                            fontSize: "12px"
                        }}
                    >
                        {cartcount}
                    </span>

                </div>


                {/* USER INFO */}
                {user ? (

                    <>
                        <div>
                            <div>{user.name}</div>
                            <div>{user.email}</div>
                        </div>

                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </>

                ) : (

                    <span>No User</span>

                )}

            </div>

        </div>
    )
}

export default Navbar