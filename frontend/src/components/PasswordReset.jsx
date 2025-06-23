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
import {useParams } from 'react-router-dom';
import Axiosinstance from "../components/Axiosinstance";
import Message from './Message'

import {passwordResetValidationPasswordSchema} from './passwordResetValidationPasswordSchema'

const PasswordReset = () =>{
    const navigate = useNavigate()
    
    const {token} = useParams()
    console.log(token)
    const [ShowMessage, setShowMessage] = useState(false)
      const formik = useFormik({
    initialValues: {
      password: '', 
      confirmPassword: ''
      
    },
    validationSchema: passwordResetValidationPasswordSchema,
    onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
        
        console.log('Making request to:', '/password_reset/confirm/');
        
        try {
            console.log('Making request to:', '/password_reset/confirm/');
            await Axiosinstance.post('../password_reset/confirm/', {
            password: values.password,
            token:token,
            
            });
            
            setShowMessage(true)
            setTimeout(() => {

            
            setShowMessage(false);
            resetForm();
            navigate('/dashboard');
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



    return(
       
        <div className={"login-container myform"} > 

        {ShowMessage ? <Message text={"You successfully changed your password"}  color={'#69C9AB'}/> : null}
        <form 
        
        onSubmit={(e) => {
  e.preventDefault(); // Add this if missing
  console.log("FORM SUBMIT EVENT", e);
  formik.handleSubmit(e);}}
        >

        

        <Box className={"login-box"}>

            <Box className={"itemBox"}>
                <Box className={"login-title1"}>  password resets </Box>
            </Box>

            <Box className={"itemBox"}>
               <Mypasswordinput label="Password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
            </Box>
            <Box className={"itemBox"}>
               <Mypasswordinput
                            label="Confirm Password"
                            name="confirmPassword"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                          />
            </Box>

            <Box className={"itemBox"}>
                <Buttons 
                    label={"Reset Password"}
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

export default PasswordReset