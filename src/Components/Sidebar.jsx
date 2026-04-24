import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Myuseauth } from '../Context/Authcontext'

function Sidebar() {


  const navigate = useNavigate()

  const {Logout} = Myuseauth()

  const mylogout = () => {
    Logout()
    navigate("/login")
  }

  return (
    <div style={{ width: "200px", height: "100vh", background: "#222", color: "#fff", padding: "10px" }}>
      <h2>Admin</h2>

      <nav>

        <li>
          <NavLink to="/admin">Dashboard</NavLink>
        </li>

        <li>
          <NavLink to="/admin/users">Users</NavLink>
        </li>

        <li>
          <NavLink to="/admin/products">Products</NavLink>
        </li>

        <li>
          <NavLink to="/admin/orders">Orders</NavLink>
        </li>

        <li>
           <NavLink to="/admin/category">Category</NavLink>
        </li>

        <li>
          <button onClick={mylogout}>Logout</button>
        </li>
      </nav>

    </div>
  )
}

export default Sidebar