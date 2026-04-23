import React from 'react'
import { useFormik } from 'formik'
import { RegisterSchema } from '../Formvalidation/Registerform'
import { Link, useNavigate } from 'react-router-dom'
import { registeruser } from '../Services/api'

function Register() {

    const navigate = useNavigate()

    const myformik = useFormik({
        initialValues: {
            userName: '',
            userEmail: '',
            userPassword: ''
        },

        validationSchema: RegisterSchema,

        onSubmit: (values, action) => {

            registeruser(values)
                .then((responce) => {
                    console.log(responce.data)

                    alert(responce.data.message);

                    action.resetForm();
                    navigate('/login');
                })
                .catch((error) => {
                    console.log("registrtion failed !", error);
                    alert("Registration failed . please try again !")
                })
        }
    });


    return (
        <>
            <h2>Register Form</h2>

            <form onSubmit={myformik.handleSubmit}>

                <label>Username:</label>
                <input
                    type="text"
                    name="userName"
                    onBlur={myformik.handleBlur}
                    value={myformik.values.userName}
                    onChange={myformik.handleChange}
                />
                <br />
                {myformik.touched.userName && myformik.errors.userName && (
                    <div style={{ color: 'red' }}>{myformik.errors.userName}</div>
                )}

                <br />

                <label>Email:</label>
                <input
                    type="email"
                    name="userEmail"
                    onBlur={myformik.handleBlur}
                    value={myformik.values.userEmail}
                    onChange={myformik.handleChange}
                />
                <br />
                {myformik.touched.userEmail && myformik.errors.userEmail && (
                    <div style={{ color: 'red' }}>{myformik.errors.userEmail}</div>
                )}

                <br />

                <label>Password:</label>
                <input
                    type="password"
                    name="userPassword"
                    onBlur={myformik.handleBlur}
                    value={myformik.values.userPassword}
                    onChange={myformik.handleChange}
                />
                <br />
                {myformik.touched.userPassword && myformik.errors.userPassword && (
                    <div style={{ color: 'red' }}>{myformik.errors.userPassword}</div>
                )}

                <br />

                <button type="submit">Register</button>
            </form>

            <Link to='/login'>Already have an account? Login here</Link>
        </>
    )
}

export default Register