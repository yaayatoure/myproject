
// export default Loginpage
import React from 'react';
import '../App.css';
import Box from '@mui/material/Box';
// import { useNavigate,Link } from 'react-router-dom';
import Mytextinput from '../form/Mytextinput';
import Mypasswordinput from '../form/Mypasswordinput';
import Buttons from '../form/Buttons';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';


import { loginValidationSchemas } from '../form/loginvalidationSchemas';

import Axiosinstance from "../components/Axiosinstance";
function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginValidationSchemas,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await Axiosinstance.post('/login/', {
          email: values.email,
          password: values.password
        });
        // console.log(response);
  //       localStorage.setItem('Token',response.data.token);
  //       console.log('Redirecting to /dashboard...');
  //       navigate('/dashboard') // Wait 3 seconds
  //        // Show success alert
  //       // await Swal.fire({
  //       //   title: 'Success!',
  //       //   text: 'Registration successful. Redirecting to login...',
  //       //   icon: 'success',
  //       //   confirmButtonText: 'OK',
  //       //   timer: 3000,
  //       //   timerProgressBar: true,
  //       //   showCancelButton:true,
  //       //   allowOutsideClick:true,
  //       //   allowEnterKey:true,
  //       //   position: 'top-end',
  //       // });
  //       // navigate('/login');
  //     }catch (error) {
  // if (error.response?.data) {
  //   // Handle Django field errors
  //   const backendErrors = error.response.data;
  //   const formErrors = {};
    
  //   // Convert {"email": ["Error message"]} to Formik errors
  //   Object.entries(backendErrors).forEach(([field, messages]) => {
  //     formErrors[field] = Array.isArray(messages) ? messages.join(' ') : messages;
  //   });
    
  //   setErrors(formErrors);
  // } 
      // Only proceed if we got a token
      if (response.data.token) {
      localStorage.setItem('Token', response.data.token);
      navigate('/dashboard');
    }
  } catch (error) {
    console.log('Login error:', error.response?.data || error.message);
    
    if (error.response) {
      // Handle 401 Unauthorized (invalid credentials)
      if (error.response.status === 401) {
        setErrors({ 
          submit: 'Invalid email or password' 
        });
        Swal.fire({
          title: 'Login Failed',
          text: 'Invalid email or password',
          icon: 'error'
        });
      } 
      // Handle other error statuses
      else {
        const backendErrors = error.response.data;
        const formErrors = {};
        
        // Handle non_field_errors
        if (backendErrors.non_field_errors) {
          formErrors.submit = backendErrors.non_field_errors.join(' ');
        }
        
        // Handle field-specific errors
        Object.entries(backendErrors).forEach(([field, messages]) => {
          if (field !== 'non_field_errors') {
            formErrors[field] = Array.isArray(messages) ? messages.join(' ') : messages;
          }
        });
        
        setErrors(formErrors);
      }
    } else {
      setErrors({ submit: error.message || 'Login failed' });
    }
  } finally {
    setSubmitting(false);
  }
}
  });


  //.............
  return (
    <div className='login-container myform'>
       <form onSubmit={(e) => {
  e.preventDefault(); // Prevent page reload
  formik.handleSubmit(e);
}}>
      <Box className='login-box '>
        <Box className='login-title'>
          Login Form
        </Box>
        <Box>
          <Mytextinput label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Box>
        <Box>
          <Mypasswordinput label="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
          />
        </Box>
        <Box>
          <Buttons label="Login"  type="submit" disabled={formik.isSubmitting} />
        </Box>
        <Box className='links_below' >
          <Link className='link' to="/register">Don't have account? Create an account</Link>
         <Link to="/request/password_reset"> Password forgotten? Click here </Link>
        </Box>
       
      </Box>
      </form>
    </div>
  );
}

export default Login;
