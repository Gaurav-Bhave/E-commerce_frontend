import React, { useEffect, useState } from 'react'
import { GetallBrands } from "../../Services/api"
import { Outlet, useNavigate } from 'react-router-dom'

function Brand() {

  const [mybranddata, setmybranddata] = useState([])

  useEffect(() => {
    GetallBrands().then((responce) => {
      setmybranddata(responce.data.data)
    })
  }, [])


    const navigate = useNavigate()

    const handleclick = () => {
      navigate("add-brand")
    }

  return (
    <>
    <div>admin side Brand</div>

    <button onClick={handleclick}>Add brand</button>
    <Outlet/>
    <h2>All brands</h2>
    {
      mybranddata.map((item) => (
        <div>
          <h4>{item.id}</h4>
          <h4>{item.name}</h4>
        </div>
      ))
    }
    </>

    
  )
}

export default Brand