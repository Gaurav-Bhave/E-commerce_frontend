import React, { useEffect, useState } from 'react'
import { Getallcategory } from "../../Services/api"
import { Outlet, useNavigate } from 'react-router-dom'

function Category() {

  const [mycategorydata, setmycategorydata] = useState([])

  useEffect(() => {
    Getallcategory().then((responce) => {
      setmycategorydata(responce.data.data)
    })

  }, [])


  const mynavigate = useNavigate()

  const handlenavigate = () => {
    mynavigate("add-category")
  }

  return (


    <>
      <div>Admin side Category</div>

      <button onClick={handlenavigate}>Add Category</button>

      <Outlet />

      <h2>All Category</h2>
      {mycategorydata.map((item) => (
        <div key={item.id}>
          <h4>{item.id}</h4>
          <h4>{item.name}</h4>
        </div>
      ))}
    </>
  )
}

export default Category