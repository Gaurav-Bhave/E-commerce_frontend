import React from 'react'
import { CategorySchema } from "../../../Formvalidation/CategoryValidation"
import { useFormik } from 'formik'
import {Createcategory} from "../../../Services/api"

function Addcategory() {

    const myformik = useFormik({
        initialValues: {
            categoryName: ""
        },

        validationSchema: CategorySchema,

        onSubmit: (values , action) => {
            Createcategory(values).then((Response) => {
                console.log(Response.data.data)
                console.log(Response.data.message)

                alert("Category created successfully !")
                action.resetForm()
            })
            .catch((error) => {
                console.log(error)
                alert("Error while creating category !!")
            })
        }
    })

    return (
        <>
            <h3>Create category</h3>

            <form onSubmit={myformik.handleSubmit}>
                <label>Category name</label>

                <input type='text'
                    name='categoryName'
                    value={myformik.values.categoryName}
                    onChange={myformik.handleChange}
                    onBlur={myformik.handleBlur}
                />

                {
                    myformik.touched.categoryName && myformik.errors.categoryName ? (
                        <p style={{ color: "red" }}>
                            {myformik.errors.categoryName}
                        </p>
                    ) : null
                }

                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default Addcategory