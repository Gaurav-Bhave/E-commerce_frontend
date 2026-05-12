import axios from 'axios';
import { header, param } from 'framer-motion/client';
import { data } from 'react-router-dom';


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

export const GetProductwithimages = (params) => {
    return axios.get(`${Baseurl}/Product/GetProduct`, {
        params,
        headers: {
            Authorization: `Bearer ${GetToken()}`
        }
    });
};


export const Getproductbyid = (myproductid) => {
    return axios.get(`${Baseurl}/Product/Getproductbyid/${myproductid}`, {
        headers: {
            Authorization: `Bearer ${GetToken()}`
        }
    })
}



export const GetAllUsers = (params) => {
    return axios.get(`${Baseurl}/Users/GetAllUsers`, {
        params: params,
        headers: {
            Authorization: `Bearer ${GetToken()}`
        }
    })
}


export const Deleteproductbyid = (myproductid) => {
    return axios.delete(`${Baseurl}/Product/Deleteproductbyid/${myproductid}`, {
        headers: {
            Authorization: `Bearer ${GetToken()}`
        }
    })
}


export const Editproductwithimages = (mydata) => {
    return axios.put(`${Baseurl}/Product/Updateproduct`, mydata, {
        headers: {
            Authorization: `Bearer ${GetToken()}`
        }
    })
}



export const C_getallproduct = (param) => {
    return axios.get(`${Baseurl}/C_Product/C_AllProduct`, {
        params: param,
        headers: {
            Authorization: `Bearer ${GetToken()}`
        }
    })
}


export const Dashboard_summery = () => {
    return axios.get(`${Baseurl}/Product/Summery`, {
        headers: {
            Authorization: `Bearer ${GetToken()}`
        }
    })
}


export const C_productdetailsbyid = (myid) => {
    return axios.get(
        `${Baseurl}/C_Product/C_Productdetails?id=${myid}`,
        {
            headers: {
                Authorization: `Bearer ${GetToken()}`
            }
        }
    )
}

//Cart Apis

export const addToCartApi = (mydata) => {
    return axios.post(`${Baseurl}/C_Cart/AddToCart` , mydata , {
        headers : {
             Authorization: `Bearer ${GetToken()}`
        }
    }
    )
}

export const IncrementDecrementQuantity = (mydata) => {
    return axios.post(`${Baseurl}/C_Cart/update-quantity` , mydata , {
        headers : {
            Authorization : `Bearer ${GetToken()}`
        }
    })
}

export const RemoveItemFromCart = (myproductid) => {
    return axios.post(`${Baseurl}/C_Cart/remove-item-from-cart` , myproductid , {
        headers : {
             Authorization : `Bearer ${GetToken()}`
        }
    })
}


export const GetAllProductFromCart = () => {
    return axios.get(`${Baseurl}/C_Cart/get-cart` , {
        headers : {
            Authorization : `Bearer ${GetToken()}`
        }
    })
}
















