import { useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { AddProductSchema } from '../../../Formvalidation/Addproductform'
import { Getallcategory, GetallBrands, CreateProductwithImages } from "../../../Services/api"

function Addproduct() {

    const fileInputRef = useRef(null)

    const [mybranddata, setmybranddata] = useState([])
    const [mycategorydata, setmycategorydata] = useState([])

    useEffect(() => {
        Getallcategory().then((response) => {
            setmycategorydata(response.data.data)
        })
    }, [])

    useEffect(() => {
        GetallBrands().then((response) => {
            setmybranddata(response.data.data)
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

        onSubmit: async (values, action) => {

            try {
                const formData = new FormData()

                formData.append("productName", values.productName)
                formData.append("description", values.description)
                formData.append("price", values.price)
                formData.append("categoryId", values.categoryId)
                formData.append("brandId", values.brandId)
                formData.append("stockQuantity", values.stockQuantity)

                values.productImages.forEach((image) => {
                    formData.append("productImages", image)
                })

                const response = await CreateProductwithImages(formData)

                console.log(response.data.data)
                alert(response.data.message)

                action.resetForm()

                // ✅ FILE INPUT CLEAR FIX
                if (fileInputRef.current) {
                    fileInputRef.current.value = ""
                }

            } catch (error) {
                console.log(error)
                alert("Error while creating product")
            }
        }
    })

    const handleImageChange = (event) => {
        const files = Array.from(event.currentTarget.files)

        if (files.length > 5) {
            alert("Maximum 5 images allowed!")
            return
        }

        myformik.setFieldValue("productImages", files)
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
                    value={myformik.values.productName}
                    onChange={myformik.handleChange}
                    onBlur={myformik.handleBlur}
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
                    value={myformik.values.description}
                    onChange={myformik.handleChange}
                    onBlur={myformik.handleBlur}
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
                    value={myformik.values.price}
                    onChange={myformik.handleChange}
                    onBlur={myformik.handleBlur}
                />
                <br />
                {myformik.touched.price && myformik.errors.price && (
                    <div style={{ color: 'red' }}>{myformik.errors.price}</div>
                )}

                <br />

                {/* Stock */}
                <label>Stock Quantity:</label>
                <input
                    type="number"
                    name="stockQuantity"
                    value={myformik.values.stockQuantity}
                    onChange={myformik.handleChange}
                    onBlur={myformik.handleBlur}
                />
                <br />
                {myformik.touched.stockQuantity && myformik.errors.stockQuantity && (
                    <div style={{ color: 'red' }}>{myformik.errors.stockQuantity}</div>
                )}

                <br />

                {/* Category */}
                <label>Category:</label>
                <select
                    name="categoryId"
                    value={myformik.values.categoryId}
                    onChange={myformik.handleChange}
                    onBlur={myformik.handleBlur}
                >
                    <option value="">Select Category</option>
                    {mycategorydata.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>

                <br />
                {myformik.touched.categoryId && myformik.errors.categoryId && (
                    <div style={{ color: 'red' }}>{myformik.errors.categoryId}</div>
                )}

                <br />

                {/* Brand */}
                <label>Brand:</label>
                <select
                    name="brandId"
                    value={myformik.values.brandId}
                    onChange={myformik.handleChange}
                    onBlur={myformik.handleBlur}
                >
                    <option value="">Select Brand</option>
                    {mybranddata.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>

                <br />
                {myformik.touched.brandId && myformik.errors.brandId && (
                    <div style={{ color: 'red' }}>{myformik.errors.brandId}</div>
                )}

                <br />

                {/* Images */}
                <label>Product Images:</label>
                <input
                    ref={fileInputRef}
                    type="file"
                    name="productImages"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                />

                <br />
                {myformik.touched.productImages && myformik.errors.productImages && (
                    <div style={{ color: 'red' }}>{myformik.errors.productImages}</div>
                )}

                <br />

                <button type="submit">Add Product</button>
            </form>
        </>
    )
}

export default Addproduct