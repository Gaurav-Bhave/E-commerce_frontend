// import { useEffect, useState } from 'react'
// import { allposts } from '../../Services/api'

// function Getapiaxios() {

//     const [mydata, setmydata] = useState([])
//     const [loading, setloading] = useState(true)

//     useEffect(() => {
//         // allposts(
//             .then((response) => {
//                 setmydata(response.data)
//                 setloading(false)
//             })
//             .catch((error) => {
//                 console.log(error)
//             })
//     }, [])

//     if (loading) return <h2>Loading...</h2>

//     return (
//         <div>
//             {mydata.map((item) => (
//                 <div key={item.id}>
//                     <h3>{item.title}</h3>
//                     <p>{item.body}</p>
//                 </div>
//             ))}
//         </div>
//     )
// }

// export default Getapiaxios