import React from 'react'
import { useFormik } from 'formik'
import { LoginSchema } from '../Formvalidation/Loginform'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { loginuser } from '../Services/api'
import { Myuseauth } from '../Context/Authcontext'
import { jwtDecode } from 'jwt-decode'

function Login() {


    const navigate = useNavigate()
    const { Login } = Myuseauth();


    const myformik = useFormik({
        initialValues: {
            userEmail: '',
            userPassword: ''
        },

        validationSchema: LoginSchema,

        onSubmit: (values, action) => {

            loginuser(values).then((response) => {
                console.log(response.data)

                //set token for usecontext
                Login(response.data.data.mytoken)

                alert(response.data.message)

                action.resetForm()

                const token = response.data.data.mytoken

                const decoded = jwtDecode(token)

                const role = decoded.role || decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]

                if (role == "Admin") {
                    navigate("/admin")
                }
                else {
                    navigate("/customer")
                }

            })
                .catch((error) => {
                    console.log(error.response)
                    alert("login failed")
                })
        }
    })


    return (

        <>
            <h2>Login Form</h2>
            <form onSubmit={myformik.handleSubmit}>

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="userEmail" value={myformik.values.userEmail} onChange={myformik.handleChange} onBlur={myformik.handleBlur} />
                <br></br>
                {myformik.touched.userEmail && myformik.errors.userEmail ? (
                    <div style={{ color: 'red' }}>{myformik.errors.userEmail}</div>
                ) : null}
                <br></br>

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="userPassword" value={myformik.values.userPassword} onChange={myformik.handleChange} onBlur={myformik.handleBlur} />
                <br></br>
                {myformik.touched.userPassword && myformik.errors.userPassword ? (
                    <div style={{ color: 'red' }}>{myformik.errors.userPassword}</div>
                ) : null}
                <br></br>

                <button type="submit">Login</button>

            </form>

            <Link to='/register'>Don't have an account? Register here</Link>
        </>

    )
}

export default Login