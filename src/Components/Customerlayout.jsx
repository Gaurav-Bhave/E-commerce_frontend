import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Outlet } from 'react-router-dom'

function Customerlayout() {
    return (

        <>
            <Navbar />
            <div style={{ minHeight: "80vh", padding: "20px" }}>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default Customerlayout