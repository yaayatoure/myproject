// import { useEffect, useState } from 'react'
// import { Box, CircularProgress, Typography } from '@mui/material'
// import Axiosinstance from '../components/Axiosinstance'

// function Dashboard() {
//   const [data, setData] = useState([]);
//   const [loading, setloading] = useState(true);

//   const Getdata = () => {
//     Axiosinstance.get('/users/')
//       .then((response) => {
//         setData(response.data);
//         setloading(false);
//       })
//       .catch((error) => {
//         console.error('There was an error fetching the data!', error);
//       });
//   }

//   useEffect(() => {
//     Getdata();
//   }, []);

//   return (
//     <>
//       {loading ? (
//         // <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
//         // Loading.............  <CircularProgress />
//         // </Box>
//         <Box 
//   display="flex" 
//   justifyContent="center" 
//   alignItems="center" 
//   minHeight="200px"
//   gap={2}  // Adds space between text and spinner
// >
//   <Typography variant="body1">Loading</Typography>
//   <CircularProgress size={24} />
// </Box>
        
//       ) : (
//         <div>
//           {data.map((item, index) => (
//             <Box key={index} sx={{ padding: 2, border: '1px solid #ccc', margin: 2 }}>
//               <h3>User_id {item.id}</h3>
//               <p>Email: {item.email}</p>
//               <p>User Name: {item.full_name}</p>
//             </Box>
//           ))}
//         </div>
//       )}
//     </>
//   )
// }

// export default Dashboard
import { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Button,
  Avatar,
  IconButton,
  Tooltip
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Axiosinstance from '../components/Axiosinstance';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axiosinstance.get('/users/')
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch users', err);
        setLoading(false);
      });
  }, []);

  return (
    <Box p={3}>
      {/* Top bar with Search icon */}
<Box display="flex" justifyContent="flex-end" mb={3}>
  <Button
    component={Link}
    to="/search"
    variant="contained"
    color="primary"
    startIcon={<SearchIcon />}
    sx={{ textTransform: 'none', fontWeight: 'bold', px: 3 }}
  >
    Search
  </Button>
</Box>
      {/* Content */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px" gap={2}>
          <Typography>Loading</Typography>
          <CircularProgress size={24} />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {users.map((user, index) => (
            <Grid key={index} xs={12} sm={6} md={4}>
              <Card sx={{ borderRadius: 3, boxShadow: 3, padding: 2 }}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar
                    src={user.profile?.profile_picture || ''}
                    sx={{ width: 56, height: 56 }}
                  />
                  <Box>
                    <Typography variant="h6">{user.username}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.email}
                    </Typography>
                    {user.profile?.bio && (
                      <Typography variant="body2" mt={1}>
                        {user.profile.bio}
                      </Typography>
                    )}
                    {user.profile?.phone_number && (
                      <Typography variant="body2" color="text.secondary">
                        📞 {user.profile.phone_number}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default Dashboard;
