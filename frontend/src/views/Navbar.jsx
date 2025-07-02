import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import Breadcrumbs from '../views/Breadcrumbs';
import {Link , useLocation} from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import Axiosinstance from '../components/Axiosinstance';
import {useNavigate} from 'react-router-dom';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SearchIcon from '@mui/icons-material/Search';     
import ImageIcon from '@mui/icons-material/Image';     
const drawerWidth = 240;

export default function Navbar(props) {
  const {content} = props
  const location = useLocation()
  const path = location.pathname
  const navigate = useNavigate()
  
  
  const logoutUser = () =>{
     Axiosinstance.post(`../../logoutall/`,{
     })
     .then( () => {
        localStorage.removeItem("Token")
        navigate('/')
     }

     )
  }


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Yahye Project
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
              <ListItem key={2}  disablePadding>
                <ListItemButton component={Link} selected={'/dashboard' === path } to='/dashboard'>
                  <ListItemIcon>
                   <InboxIcon  /> 
                  </ListItemIcon  >
                  <ListItemText primary={'Home'} />
                </ListItemButton >
              </ListItem>
              <ListItem key={1}  disablePadding>
                <ListItemButton component={Link} selected={'/profile' === path } to='/profile'>
                  <ListItemIcon>
                   <AccountCircleIcon  /> 
                  </ListItemIcon  >
                  <ListItemText primary={'Profile'} />
                </ListItemButton >
              </ListItem>
               <ListItem disablePadding>
              <ListItemButton 
                component={Link} 
                selected={'/camera' === path} 
                to='/camera'
              >
                <ListItemIcon>
                  
                  <CloudUploadIcon /> 
                </ListItemIcon>
                <ListItemText primary='Upload Photo' />
              </ListItemButton>
            </ListItem>
            
            <ListItem disablePadding>
              <ListItemButton 
                component={Link} 
                selected={'/upload' === path} 
                to='/upload'
              >
                <ListItemIcon>
                  <CameraAltIcon /> 
                </ListItemIcon>
                <ListItemText primary='Take Photo' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton 
                component={Link} 
                selected={'/Show' === path} 
                to='/Show'
              >
                <ListItemIcon>
                  <ImageIcon /> 
                </ListItemIcon>
                <ListItemText primary='Show Images' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton 
                component={Link} 
                selected={'/search' === path} 
                to='/search'
              >
                <ListItemIcon>
                  <SearchIcon /> 
                </ListItemIcon>
                <ListItemText primary='Search' />
              </ListItemButton>
            </ListItem>

              
              <ListItem key={3} disablePadding>
              <ListItemButton onClick={logoutUser}>
                  <ListItemIcon>
                        <LogoutIcon/> 
                  </ListItemIcon>
                  <ListItemText primary={"Logout"} />
                </ListItemButton>
              </ListItem>
  
              {/* <ListItem key={2}  disablePadding>
                <ListItemButton component={Link} selected={'/login' === path } to='/login'>
                  <ListItemIcon>
                   <Test  /> 
                  </ListItemIcon  >
                  
                </ListItemButton >
              </ListItem> */}
            
          </List>
          <Divider />
         
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {/* <h2>Current Page: {location.pathname==='/' ? 'Homepage':location.pathname}</h2> */}
        <Breadcrumbs />
        {content}
      </Box>
    </Box>
  );
}




// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import AppBar from '@mui/material/AppBar';
// import CssBaseline from '@mui/material/CssBaseline';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import MailIcon from '@mui/icons-material/Mail';
// import LogoutIcon from '@mui/icons-material/Logout';
// import CameraAltIcon from '@mui/icons-material/CameraAlt';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import { Link, useLocation } from 'react-router-dom';
// import Axiosinstance from '../components/Axiosinstance';
// import { useNavigate } from 'react-router-dom';
// import Breadcrumbs from '../views/Breadcrumbs';

// const drawerWidth = 240;

// export default function Navbar(props) {
//   const { content } = props;
//   const location = useLocation();
//   const path = location.pathname;
//   const navigate = useNavigate();
  
//   const logoutUser = async () => {
//     try {
//       await Axiosinstance.post('logoutall/');
//       localStorage.removeItem("Token");
//       navigate('/login');
//     } catch (error) {
//       console.error('Logout failed:', error);
//       // Handle logout error (e.g., show error message)
//     }
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
//         <Toolbar>
//           <Typography variant="h6" noWrap component="div">
//             Yahye Project
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           [`& .MuiDrawer-paper`]: { 
//             width: drawerWidth, 
//             boxSizing: 'border-box' 
//           },
//         }}
//       >
//         <Toolbar />
//         <Box sx={{ overflow: 'auto' }}>
//           <List>
//             <ListItem disablePadding>
//               <ListItemButton 
//                 component={Link} 
//                 selected={'/' === path} 
//                 to='/'
//               >
//                 <ListItemIcon>
//                   <MoveToInboxIcon /> 
//                 </ListItemIcon>
//                 <ListItemText primary='Home' />
//               </ListItemButton>
//             </ListItem>
            
//             <ListItem disablePadding>
//               <ListItemButton 
//                 component={Link} 
//                 selected={'/profile' === path} 
//                 to='/profile'
//               >
//                 <ListItemIcon>
//                   <AccountCircleIcon /> 
//                 </ListItemIcon>
//                 <ListItemText primary='Profile' />
//               </ListItemButton>
//             </ListItem>
            
//             <ListItem disablePadding>
//               <ListItemButton 
//                 component={Link} 
//                 selected={'/camera' === path} 
//                 to='/camera'
//               >
//                 <ListItemIcon>
//                   <CameraAltIcon /> 
//                 </ListItemIcon>
//                 <ListItemText primary='Take Photo' />
//               </ListItemButton>
//             </ListItem>
            
//             <ListItem disablePadding>
//               <ListItemButton 
//                 component={Link} 
//                 selected={'/upload' === path} 
//                 to='/upload'
//               >
//                 <ListItemIcon>
//                   <CloudUploadIcon /> 
//                 </ListItemIcon>
//                 <ListItemText primary='Upload Photo' />
//               </ListItemButton>
//             </ListItem>
            
//             <ListItem disablePadding>
//               <ListItemButton onClick={logoutUser}>
//                 <ListItemIcon>
//                   <LogoutIcon /> 
//                 </ListItemIcon>
//                 <ListItemText primary='Logout' />
//               </ListItemButton>
//             </ListItem>
//           </List>
//           <Divider />
//         </Box>
//       </Drawer>
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <Toolbar />
//         <Breadcrumbs />
//         {content}
//       </Box>
//     </Box>
//   );
// }