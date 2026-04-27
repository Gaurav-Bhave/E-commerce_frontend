import axios from 'axios';

const Baseurl = 'https://localhost:7046/api';

// const Baseurl = "http://localhost:5134/api";

const GetToken = () => localStorage.getItem("myitem");


export const registeruser = (myrequestdata) => {
    return axios.post(`${Baseurl}/Register/RegisterUser`, myrequestdata)
}

export const loginuser = (myrequestdataforlogin) => {
    return axios.post(`${Baseurl}/Register/LoginUser`, myrequestdataforlogin)
}


export const Getallcategory = () => {
    return axios.get(`${Baseurl}/Category/AllCategory`, {
        headers: {
            Authorization: `Bearer ${GetToken()}`
        }
    })
}

export const GetallBrands = () => {
    return axios.get(`${Baseurl}/Brands/AllBrands`, {
        headers: {
            Authorization: `Bearer ${GetToken()}`
        }
    })
}

export const Createbrand = (myinputvalue) => {
    return axios.post(`${Baseurl}/Brands/CreateBrand`, myinputvalue, {
        headers: {
            Authorization: `Bearer ${GetToken()}`
        }
    })
}

export const Createcategory = (myinputcategoryname) => {
    return axios.post(`${Baseurl}/Category/Createcategory`, myinputcategoryname, {
        headers: {
            Authorization: `Bearer ${GetToken()}`
        }
    })
}

export const CreateProductwithImages = (myinputproductvalues) => {
    return axios.post(`${Baseurl}/Product/CreateProduct`, myinputproductvalues, {
        headers: {
            Authorization: `Bearer ${GetToken()}`,
            'Content-Type': 'multipart/form-data'

        }
    })
}








