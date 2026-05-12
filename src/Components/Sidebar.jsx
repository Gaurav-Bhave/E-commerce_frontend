import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Myuseauth } from '../Context/Authcontext'

function Sidebar() {

  const navigate = useNavigate()
  const { Logout, user } = Myuseauth()

  const mylogout = () => {
    Logout()
    navigate("/login")
  }

  return (
    <div style={{
      width: "220px",
      height: "100vh",
      background: "#222",
      color: "#fff",
      padding: "15px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }}>

      {/* 🔝 TOP SECTION */}
      <div>

        <h2>Admin Panel</h2>

        {/* 👤 USER INFO */}
        <div style={{
          background: "#333",
          padding: "10px",
          borderRadius: "8px",
          marginBottom: "15px"
        }}>
          {user ? (
            <>
              <div style={{ fontWeight: "bold" }}>
                {user.name}
              </div>

              <div style={{ fontSize: "12px", color: "#ccc" }}>
                {user.email}
              </div>

              {/* 🎯 ROLE */}
              <div style={{ marginTop: "5px" }}>
                <span style={{
                  background: user.role === "Admin" ? "#dc3545" : "#28a745",
                  padding: "3px 8px",
                  borderRadius: "5px",
                  fontSize: "11px"
                }}>
                  {user.role}
                </span>
              </div>
            </>
          ) : "No User"}
        </div>

        {/* 📂 MENU */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

          <NavLink to="/admin" style={{ color: "#fff" }}>
            Dashboard
          </NavLink>

          <NavLink to="/admin/users" style={{ color: "#fff" }}>
            Users
          </NavLink>

          <NavLink to="/admin/products" style={{ color: "#fff" }}>
            Products
          </NavLink>

          <NavLink to="/admin/orders" style={{ color: "#fff" }}>
            Orders
          </NavLink>

          <NavLink to="/admin/category" style={{ color: "#fff" }}>
            Category
          </NavLink>

          <NavLink to="/admin/brand" style={{ color: "#fff" }}>
            Brand
          </NavLink>

        </nav>

      </div>

      {/* 🔻 LOGOUT */}
      <button
        onClick={mylogout}
        style={{
          padding: "8px",
          background: "#dc3545",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Logout
      </button>

    </div>
  )
}

export default Sidebar