import axios from 'axios';



// const Baseurl2 = 'https://jsonplaceholder.typicode.com/posts';


// export const allposts = () => {
//     return axios.get(Baseurl2)
// }


// export const registeruser = (mydata) => {
//     return axios.post(`${Baseurl}/Register/RegisterUser`, mydata);
// }


const Baseurl = 'https://localhost:7046/api';

export const registeruser = (myrequestdata) => {
    return axios.post(`${Baseurl}/Register/RegisterUser` , myrequestdata)
}

export const loginuser = (myrequestdataforlogin) => {
    return axios.post(`${Baseurl}/Register/LoginUser` , myrequestdataforlogin)
}






