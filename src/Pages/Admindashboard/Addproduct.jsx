import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { AddProductSchema } from '../../Formvalidation/Addproductform'
import { Getallcategory } from "../../Services/api"
import { GetallBrands } from "../../Services/api"

function Addproduct() {


    const [mybranddata, setmybranddata] = useState([])

    const [mycategorydata, setmycategorydata] = useState([])

    useEffect(() => {
        Getallcategory().then((Response) => {
            setmycategorydata(Response.data.data)
        })
    }, [])


    useEffect(() => {
        GetallBrands().then((Response) => {
            setmybranddata(Response.data.data)
        })
    }, [])

    const myformik = useFormik({
        initialValues: {

            productName: '',
            description: '',
            price: '',
            categoryId: '',
            brandId: '',
            stockQuantity: '',
            productImages: []
        },

        validationSchema: AddProductSchema,

        onSubmit: (values, action) => {

            console.log("form values", values)
            console.log("Iamges", values.productImages)

            action.resetForm();
        }
    })

    const handleImageChange = (event) => {

        const files = event.currentTarget.files

        //file list ko array me convert kiya 
        const filearray = Array.from(files)

        if (filearray.length > 5) {
            alert("maximum 5 images allowed !")
            return;
        }

        //array list ko formik ke values me stored kar diya
        myformik.setFieldValue("productImages", filearray)
    }


    return (


        <>
            <h2>Add New Product</h2>

            <form onSubmit={myformik.handleSubmit}>

                {/* Product Name */}
                <label>Product Name:</label>
                <input
                    type="text"
                    name="productName"
                    onBlur={myformik.handleBlur}
                    value={myformik.values.productName}
                    onChange={myformik.handleChange}
                    placeholder="Enter product name"
                />
                <br />
                {myformik.touched.productName && myformik.errors.productName && (
                    <div style={{ color: 'red' }}>{myformik.errors.productName}</div>
                )}
                <br />

                {/* Description */}
                <label>Description:</label>
                <textarea
                    name="description"
                    onBlur={myformik.handleBlur}
                    value={myformik.values.description}
                    onChange={myformik.handleChange}
                    placeholder="Enter product description"
                    rows="5"
                />
                <br />
                {myformik.touched.description && myformik.errors.description && (
                    <div style={{ color: 'red' }}>{myformik.errors.description}</div>
                )}
                <br />

                {/* Price */}
                <label>Price:</label>
                <input
                    type="number"
                    name="price"
                    step="0.01"
                    onBlur={myformik.handleBlur}
                    value={myformik.values.price}
                    onChange={myformik.handleChange}
                    placeholder="0.00"
                />
                <br />
                {myformik.touched.price && myformik.errors.price && (
                    <div style={{ color: 'red' }}>{myformik.errors.price}</div>
                )}
                <br />

                {/* Stock Quantity */}
                <label>Stock Quantity:</label>
                <input
                    type="number"
                    name="stockQuantity"
                    onBlur={myformik.handleBlur}
                    value={myformik.values.stockQuantity}
                    onChange={myformik.handleChange}
                    placeholder="0"
                />
                <br />
                {myformik.touched.stockQuantity && myformik.errors.stockQuantity && (
                    <div style={{ color: 'red' }}>{myformik.errors.stockQuantity}</div>
                )}
                <br />

                {/* Category */}
                <label>Category:</label>
                {/* <select
                    name="categoryId"
                    onBlur={myformik.handleBlur}
                    value={myformik.values.categoryId}
                    onChange={myformik.handleChange}
                >

                    {
                        mycategorydata.map((item) => (
                            <option value={item.id}>{item.name}</option>
                        ))
                    }
                </select> */}

                <select
                    name="categoryId"
                    onBlur={myformik.handleBlur}
                    value={myformik.values.categoryId}
                    onChange={myformik.handleChange}
                >
                    <option value="">Select Category</option>

                    {
                        mycategorydata.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))
                    }
                </select>
                <br />
                {myformik.touched.categoryId && myformik.errors.categoryId && (
                    <div style={{ color: 'red' }}>{myformik.errors.categoryId}</div>
                )}
                <br />

                {/* Brand */}
                <label>Brand:</label>
                {/* <select
                    name="brandId"
                    onBlur={myformik.handleBlur}
                    value={myformik.values.brandId}
                    onChange={myformik.handleChange}
                >
                    {
                        mybranddata.map((item) => (
                            <option value={item.id}>{item.name}</option>
                        ))
                    }
                </select> */}

                <select
                    name="brandId"
                    onBlur={myformik.handleBlur}
                    value={myformik.values.brandId}
                    onChange={myformik.handleChange}
                >
                    <option value="">Select Brand</option>

                    {
                        mybranddata.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))
                    }
                </select>
                <br />
                {myformik.touched.brandId && myformik.errors.brandId && (
                    <div style={{ color: 'red' }}>{myformik.errors.brandId}</div>
                )}
                <br />

                {/* Product Images - Sirf file select */}
                <label>Product Images  : </label>
                <input
                    type="file"
                    name="productImages"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                // onBlur={myformik.handleBlur}
                />
                <br />
                {myformik.touched.productImages && myformik.errors.productImages && (
                    <div style={{ color: 'red' }}>{myformik.errors.productImages}</div>
                )}
                <br />

                {/* Submit Button */}
                <button type="submit">Add Product</button>
            </form>
        </>
    )
}

export default Addproduct