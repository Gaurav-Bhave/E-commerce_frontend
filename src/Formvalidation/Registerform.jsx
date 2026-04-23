import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
    userName: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .max(15, 'Username must be at most 15 characters')
        .required('Username is required'),

    userEmail: Yup.string()
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format')
        .required('Email is required'),

    userPassword: Yup.string()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/, 'Password must contain at least one lowercase letter, one uppercase letter, and one digit')
        .required('Password is required')
})