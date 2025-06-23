// import * as React from 'react';
// import Button from '@mui/material/Button';
// import '../App.css';
// export default function Buttons(props) {
//     const { label } = props;
//   return (


//       <Button sx={{ bgcolor: 'blue' }} variant="contained" fullWidth>{label}</Button>


//   );
// }
// src/form/Buttons.jsx
import * as React from 'react';
import Button from '@mui/material/Button';
import '../App.css';

export default function Buttons(props) {
  const {
    label,
    type = 'button',
    onClick,
    disabled = false,
    ...rest
  } = props;

  return (
    <Button
      type={type}
      variant="contained"
      fullWidth
      disabled={disabled}
      onClick={onClick}
      sx={{
        bgcolor: 'blue',
        '&:hover': {
          backgroundColor: '#003399'
        }
      }}
      {...rest}
    >
      {label}
    </Button>
  );
}
