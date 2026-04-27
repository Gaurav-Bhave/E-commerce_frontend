import React from 'react'
import { BrandSchema } from "../../../Formvalidation/BrandValidation"
import { Formik, useFormik } from 'formik'
import {Createbrand} from "../../../Services/api"

function AddBrand() {


    const myformik = useFormik({
        initialValues: {
            brandName: ""
        },

        validationSchema: BrandSchema,

        onSubmit: (values , action) => {
            

            Createbrand(values).then((Response) => {
                console.log(Response.data.data)
                console.log(Response.data.message)

                alert("Brand created succesfully !")
                action.resetForm()
                
            }).catch((error) => {
                alert("Error while creating brand !!")
            })
        }
    })


    return (
        <>
            <h2>Create Brand</h2>

            <form onSubmit={myformik.handleSubmit} >
                <label>Brand name</label>
                <input type='text'
                    name='brandName'
                    onChange={myformik.handleChange}
                    value={myformik.values.brandName}
                    onBlur={myformik.handleBlur} />

                {
                    myformik.touched.brandName && myformik.errors.brandName ? (
                        <p style={{ color: "red" }}>{myformik.errors.brandName}</p>
                    ) : null
                }

                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default AddBrand