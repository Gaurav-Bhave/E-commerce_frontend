import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Baseurl = 'https://jsonplaceholder.typicode.com/posts/10';


function Axiosapi() {

    const [mydata, setmydata] = useState([]);

    useEffect(() => {
        axios.get(Baseurl).then((responce) => {
            setmydata(responce.data);
        })
    }, [])


    return (
    <>
      
        <div>
            <h2>id : {mydata.id}</h2>
            <h2>title : {mydata.title}</h2>
            <p>body : {mydata.body}</p>
        </div>
    </>
  )
}

export default Axiosapi