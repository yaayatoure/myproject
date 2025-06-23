// import * as React from 'react';
// import TextField from '@mui/material/TextField';
// import '../App.css';

// export default function Mytextinput({ label }) {
//   return (
//     <TextField
//       fullWidth
//       label={label}
//       variant="outlined"
//       sx={{
//         '& .MuiOutlinedInput-root': {
//           backgroundColor: 'white',  // Targets the input area
//           '&:hover .MuiOutlinedInput-notchedOutline': {
//             borderColor: '#1976d2'  // Optional: hover border color
//           }
//         }
//       }}
//     />
//   );
// }
// src/form/Mytextinput.jsx
import * as React from 'react';
import TextField from '@mui/material/TextField';
import '../App.css';

export default function Mytextinput(props) {
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

  return (
    <TextField
      fullWidth
      id={id}
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      variant="outlined"
      margin="normal"
      sx={{
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'white',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1976d2'
          }
        }
      }}
      {...rest}
    />
  );
}
