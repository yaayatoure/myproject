// src/form/validationSchema.js
import * as Yup from 'yup';

export const registerValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
    username: Yup.string().min(3, 'Too short').max(20, 'Too long').required('Required'),
});

export default registerValidationSchema;

// export const validationSchema=Yup.object().shape({
//     email: Yup.string().email('Invalid email address').required('Email is required'),
//     password:Yup.string().min(8,'Password must be at least 8 characters').required('Enter your password'),
//     confirm_password: Yup.string().oneOf([Yup.ref('password'),null],'Passwords must match').required('Please confirm your password')
// })