import React, { useEffect, useState } from 'react'
import { GetAllUsers } from "../../../Services/api"

function Users() {


  const [mycurrentpage, setmycurrentpage] = useState(1)
  const pagesize = 5

  const [myallusers, setmyallusers] = useState([])
  const [mytotaluserscount, setmytotaluserscount] = useState(0)

  const totalpages = Math.ceil(mytotaluserscount / pagesize)



  useEffect(() => {
    GetAllUsers({
      pagenumber: mycurrentpage,
      pagesize: pagesize
    })
      .then((Response) => {
        setmyallusers(Response.data.data)


        // ✅ totalUsers array के पहले element से लो
        if (Response.data.data.length > 0) {
          setmytotaluserscount(Response.data.data[0].totalUsers)
        }

        console.log(Response.data.data)
        console.log(Response.data.data.totalUsers)
      })
      .catch((Error) => {
        console.log(Error.message)
      })
  }, [mycurrentpage])



  return (
    <>
      <h3>All Users</h3>

      <table border={1}>
        <thead>
          <tr>
            {/* <th>Id</th> */}
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Active</th>
            <th>CreatedAt</th>
          </tr>
        </thead>

        <tbody>
          {
            myallusers.map((item) => (
              <tr key={item.id}>
                {/* <td>{item.id}</td> */}
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.roleName}</td>
                <td>{item.isActive ? "Active" : "Inactive"}</td>
                <td>{item.createdAt}</td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <div>

        <button onClick={() => setmycurrentpage(mycurrentpage - 1)} disabled={mycurrentpage == 1}>
          Prev
        </button>

        <span>
          {mycurrentpage} of {totalpages}
        </span>

        <button onClick={() => setmycurrentpage(mycurrentpage + 1)} disabled={mycurrentpage == totalpages}>
          Next
        </button>
      </div>
    </>

  )
}

export default Users