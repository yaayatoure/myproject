// // import * as React from 'react';
// // import Box from '@mui/material/Box';
// // import IconButton from '@mui/material/IconButton';
// // import OutlinedInput from '@mui/material/OutlinedInput';
// // import InputLabel from '@mui/material/InputLabel';
// // import InputAdornment from '@mui/material/InputAdornment';
// // import FormControl from '@mui/material/FormControl';
// // import Visibility from '@mui/icons-material/Visibility';
// // import VisibilityOff from '@mui/icons-material/VisibilityOff';



// // export default function Mypasswordinput(props) {
// //   const [showPassword, setShowPassword] = React.useState(false);

// //   const handleClickShowPassword = () => setShowPassword((show) => !show);

// //   const handleMouseEvent = (event) => event.preventDefault();

// //   const { label } = props;
  
// //   return (
// //     <FormControl variant="outlined" fullWidth >
// //       <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
// //       <OutlinedInput
        
// //         id="outlined-adornment-password"
// //         type={showPassword ? 'text' : 'password'}
// //         endAdornment={
// //           <InputAdornment position="end">
// //             <IconButton
// //               aria-label={showPassword ? 'Hide password' : 'Show password'}
// //               onClick={handleClickShowPassword}
// //               onMouseDown={handleMouseEvent}
// //               onMouseUp={handleMouseEvent}
// //               edge="end"
// //             >
// //               {showPassword ? <VisibilityOff /> : <Visibility />}
// //             </IconButton>
// //           </InputAdornment>
// //         }
// //         label={label}
        
// //       />
// //     </FormControl>
// //   );
// // }
// // import * as React from 'react';
// // import Box from '@mui/material/Box';
// // import IconButton from '@mui/material/IconButton';
// // import Input from '@mui/material/Input';
// // import FilledInput from '@mui/material/FilledInput';
// // import OutlinedInput from '@mui/material/OutlinedInput';
// // import InputLabel from '@mui/material/InputLabel';
// // import InputAdornment from '@mui/material/InputAdornment';
// // import FormHelperText from '@mui/material/FormHelperText';
// // import FormControl from '@mui/material/FormControl';
// // import TextField from '@mui/material/TextField';
// // import Visibility from '@mui/icons-material/Visibility';
// // import VisibilityOff from '@mui/icons-material/VisibilityOff';

// // export default function Mypasswordinput(props) {
// //   const [showPassword, setShowPassword] = React.useState(false);

// //    const handleClickShowPassword = () => setShowPassword((show) => !show);

// //   const handleMouseEvent = (event) => event.preventDefault();

// //   const { label } = props;
  

// //   return (
       
// //         <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
// //           <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
// //           <OutlinedInput
// //             id="outlined-adornment-password"
// //             type={showPassword ? 'text' : 'password'}
// //             endAdornment={
// //               <InputAdornment position="end">
// //                 <IconButton
// //                   aria-label={
// //                     showPassword ? 'hide the password' : 'display the password'
// //                   }
// //                   onClick={handleClickShowPassword}
// //                   onMouseDown={handleMouseDownPassword}
// //                   onMouseUp={handleMouseUpPassword}
// //                   edge="end"
// //                 >
// //                   {showPassword ? <VisibilityOff /> : <Visibility />}
// //                 </IconButton>
// //               </InputAdornment>
// //             }
// //             label={label}
// //           />
// //         </FormControl>
        
      
// //   );
// // }
// import * as React from 'react';
// import IconButton from '@mui/material/IconButton';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import InputAdornment from '@mui/material/InputAdornment';
// import FormControl from '@mui/material/FormControl';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import '../App.css';
// export default function Mypasswordinput(props) {
//   const [showPassword, setShowPassword] = React.useState(false);

//   const handleClickShowPassword = () => setShowPassword((show) => !show);
//   const handleMouseEvent = (event) => event.preventDefault();
//   const { label } = props;

//   return (
//     <FormControl fullWidth variant="outlined" className='forms' >
//       <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
//       <OutlinedInput
//         id="outlined-adornment-password"
//         type={showPassword ? 'text' : 'password'}
//         endAdornment={
//           <InputAdornment position="end" >
//             <IconButton
            
//               aria-label={showPassword ? 'Hide password' : 'Show password'}
//               onClick={handleClickShowPassword}
//               onMouseDown={handleMouseEvent}
//               onMouseUp={handleMouseEvent}
//               edge="end"
//             >
//               {showPassword ? <VisibilityOff /> : <Visibility />}
//             </IconButton>
//           </InputAdornment>
          
//         }
//         label={label}
//         sx={{
//     backgroundColor: 'white', // Replace with desired color
//     '&:hover': {
//       backgroundColor: 'hover_color_here' // Optional hover effect
//     }
//   }}
//       />
//     </FormControl>
//   );
// }
// src/form/Mypasswordinput.jsx
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import '../App.css';

export default function Mypasswordinput(props) {
  const {
    id,
    label,
    name,
    value,
    onChange,
    error,
    helperText,
    ...rest
  } = props;

  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <FormControl fullWidth variant="outlined" margin="normal" error={error}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        name={name}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={togglePasswordVisibility}
              onMouseDown={(e) => e.preventDefault()}
              edge="end"
              aria-label="toggle password visibility"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
        sx={{
          backgroundColor: 'white',
          '&:hover': {
            backgroundColor: '#f0f0f0',
          }
        }}
        {...rest}
      />
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
