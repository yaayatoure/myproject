import {useState, React , useRef} from 'react';
import '../App.css';
import Box from '@mui/material/Box';
// import { useNavigate,Link } from 'react-router-dom';
import Mytextinput from '../form/Mytextinput';
import Mypasswordinput from '../form/Mypasswordinput';
import Buttons from '../form/Buttons';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import Axiosinstance from "../components/Axiosinstance";
import Message from './Message'

import {passwordResetValidationSchema} from './passwordResetValidationSchema'

const PasswordResetRequest = () =>{
    const navigate = useNavigate()
    
    
    const [ShowMessage, setShowMessage] = useState(false)
      const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: passwordResetValidationSchema,
    onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {

        try {
            await Axiosinstance.post('../password_reset/', {
            email: values.email,
            
            });
            
            setShowMessage(true)
            setTimeout(() => {

            
            setShowMessage(false);
            resetForm();
            }
            
            
            , 2000);
            
            // Show success alert
            // await Swal.fire({
            //   title: 'Success!',
            //   text: 'Registration successful. Redirecting to login...',
            //   icon: 'success',
            //   confirmButtonText: 'OK',
            //   timer: 3000,
            //   timerProgressBar: true,
            //   showCancelButton:true,
            //   allowOutsideClick:true,
            //   allowEnterKey:true,
            //   position: 'top-end',
            // });
            // navigate('/login');
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



    // const submission = (data) => {
    //     Axiosinstance.post(`api/password_reset/`, {
    //         email: data.email, 
    //     })

    //     .then((response) => {
    //         setShowMessage(true)
    //     })
      
    // }
    return(
       
        <div className={"login-container myform"} > 

        {ShowMessage ? <Message text={"If your email exists you have received an email with instructions for resetting the password"}  color={'#69C9AB'}/> : null}
        <form onSubmit={formik.handleSubmit}>

        

        <Box className={"login-box"}>

            <Box className={"itemBox"}>
                <Box className={"login-title1"}> Request password reset </Box>
            </Box>

            <Box className={"itemBox"}>
               <Mytextinput label="Email"
                           name="email"
                           value={formik.values.email}
                           onChange={formik.handleChange}
                           error={formik.touched.email && Boolean(formik.errors.email)}
                           helperText={formik.touched.email && formik.errors.email}
                           
                         />
            </Box>

            <Box className={"itemBox"}>
                <Buttons 
                    label={"Request password reset"}
                    type="submit"
                     disabled={formik.isSubmitting}
                />
            </Box>

            <Box className={"itemBox"} sx={{flexDirection:'column'}}>
             
            </Box>


        </Box>

    </form>
        
    </div>
    )

}

export default PasswordResetRequest