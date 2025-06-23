
import * as Yup from 'yup';
export const loginValidationSchemas = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required') 
    // No min-length check for login (existing users may have shorter passwords)
});