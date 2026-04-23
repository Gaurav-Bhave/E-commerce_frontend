import React, { useState, useEffect } from 'react'

function Apitesting() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((responce) => {
                return responce.json()
            })
            .then((result) => {
                console.log(result);
                setData(result);
            })
    }, [])

    return (
        <>
            <h2>API Testing</h2>

            {
                data.map((item) => (
                    <div>
                        <p>user : {item.userId}</p>
                        <h2>id : {item.id}</h2>
                        <h4>title : {item.title}</h4>
                        <p>body : {item.body}</p>
                    </div>
                ))
            }

        </>
    )
}

export default Apitesting