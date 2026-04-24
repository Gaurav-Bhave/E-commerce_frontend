import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'


function Product() {

const navigate = useNavigate()

const handleclick = () => {
  navigate("add-product")
}

  return (


    <>
     <h2>All  Product</h2>

     <button onClick={handleclick}> + Add Product</button>
     
     <Outlet/>

    </>
  )
}

export default Product