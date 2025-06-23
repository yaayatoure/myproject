
// export default Loginpage
// import React from 'react';
// import '../App.css';
// import Box from '@mui/material/Box';
// import { useNavigate,Link } from 'react-router-dom';
// import Mytextinput from '../form/Mytextinput';
// import Mypasswordinput from '../form/Mypasswordinput';
// import Buttons from '../form/Buttons';
// import { useFormik } from 'formik';
// import {validationSchema} from '../form/validationSchema';
// import Axiosinstance from '../components/Axiosinstance';


// function Registerpage() {

//   const navigate = useNavigate()
//   const formik = useFormik(
//     {
//         initialValues:{
//             email:'',
//             password:'',
//             confirm_password:''
//         },
//         validationSchema:validationSchema,
//         onSubmit: async (values,{setSubmitting,setErrors})=>{
//             try{
//                 const response = await Axiosinstance.post('/register/',{
//                     email:values.email,
//                     password:values.password
//                 });
//                 console.log(response.data);
//                 navigate('/dashboard')

//             }catch(error){
//                  setErrors({ submit: error.response?.data?.message || 'Registration failed' });
//           }
//            finally {
//         setSubmitting(false);
//       }
//         }

//     }
//   )

//   return (
//     <div className='login-container myform'>
      
//       <Box className='login-box '>
//         <Box className='login-title'>
//          Register Form
//         </Box>
       
//        <form onSubmit={formik.handleSubmit}>
//          <Box>
//            <Mytextinput 
//            label="Email"
//            name="email"
//            value={formik.values.email}
//            type="email"
//            onChange={formik.handleChange}
//            onBlur={formik.handleBlur}
//            error={formik.errors.email && formik.touched.email}
//            helperText={formik.errors.email && formik.touched.email }
           

//            />
//         </Box>
//         <Box>
//           <Mypasswordinput 
//           label="Password"
//           name="password"
//           value={formik.values.password}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           error={formik.errors.password && formik.touched.password}
//           helperText={formik.errors.password && formik.touched.password}
          
//           />
        

//         </Box>
//         <Box>
//           <Mypasswordinput label="Confirm Password"
//           name="confirm_password"
//           value={formik.values.confirm_password}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           error={formik.errors.confirm_password && formik.touched.confirm_password}
//           helperText={formik.errors.confirm_password && formik.touched.confirm_password}
//           />
//         </Box>
//         {formik.errors.submit && (
//             <Box color="error.main" textAlign="center" mb={2}>
//               {formik.errors.submit}
//             </Box>
//         )}
//         <Box>
//           <Buttons label="Register" disabled={formik.isSubmitting}/>
//         </Box>
//        </form>
//         <Box>
//          Already have account? <Link className='link' to="/login">Login please</Link>
//         </Box>
//       </Box>
//     </div>
//   );
// }

// export default Registerpage;




// src/Registerpage.jsx
import React from 'react';
import { useFormik } from 'formik';

import { registerValidationSchema } from '../form/validationSchema';

import Axiosinstance from "../components/Axiosinstance";

import '../App.css';
import Box from '@mui/material/Box';
import { useNavigate, Link } from 'react-router-dom';
import Mytextinput from '../form/Mytextinput';
import Mypasswordinput from '../form/Mypasswordinput';
import Buttons from '../form/Buttons';
import Swal from 'sweetalert2';
function Registerpage() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await Axiosinstance.post('/register/', {
          email: values.email,
          password: values.password
        });
         // Show success alert
        await Swal.fire({
          title: 'Success!',
          text: 'Registration successful. Redirecting to login...',
          icon: 'success',
          confirmButtonText: 'OK',
          timer: 3000,
          timerProgressBar: true,
          showCancelButton:true,
          allowOutsideClick:true,
          allowEnterKey:true,
          position: 'top-end',
        });
        navigate('/login');
      }catch (error) {
  if (error.response?.data) {
    // Handle Django field errors
    const backendErrors = error.response.data;
    const formErrors = {};
    
    // Convert {"email": ["Error message"]} to Formik errors
    Object.entries(backendErrors).forEach(([field, messages]) => {
      formErrors[field] = Array.isArray(messages) ? messages.join(' ') : messages;
    });
    
    setErrors(formErrors);
  } else {
    setErrors({ submit: error.message || 'Registration failed' });
  }
} finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className='login-container myform'>
      <Box className='login-box'>
        <Box className='login-title'>Register Form</Box>
        
        <form onSubmit={formik.handleSubmit}>
          <Box>
            <Mytextinput
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Box>
          <Box>
            <Mypasswordinput
              label="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Box>
          <Box>
            <Mypasswordinput
              label="Confirm Password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
          </Box>
          {formik.errors.submit && (
            <Box color="error.main" textAlign="center" mb={2}>
              {formik.errors.submit}
            </Box>
          )}
          <Box>
            <Buttons 
              label="Register" 
              type="submit"
              disabled={formik.isSubmitting}
            />
          </Box>
        </form>
        
        <Box>
          Already have account? <Link className='link' to="/login">Login please</Link>
        </Box>
      </Box>
    </div>
  );
}

export default Registerpage;




