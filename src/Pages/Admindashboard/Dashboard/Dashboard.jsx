import React, { useEffect, useState } from 'react'
import { Dashboard_summery } from "../../../Services/api"

function Dashboard() {

  const [summery, setsummery] = useState({})

  useEffect(() => {

    Dashboard_summery()
      .then((response) => {
        setsummery(response.data.data)
      })
      .catch((error) => {
        alert("Error while fetching data")
        console.log(error)
      })

  }, [])

  return (
    <>
      <div>Dashboard</div>

      <div>Total users : {summery.totaluser}</div>

      <div>Total orders : {summery.totalorders}</div>

      <div>Total revenue : {summery.totalrevenue}</div>
    </>
  )
}

export default Dashboard