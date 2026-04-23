import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

function Adminlayout() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, overflow: "auto", padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  )
}

export default Adminlayout