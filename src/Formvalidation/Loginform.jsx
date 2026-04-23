import * as yup from "yup";

export const LoginSchema = yup.object().shape({
    userEmail: yup.string()
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format')
        .required('Email is required'),

    userPassword: yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required')
});