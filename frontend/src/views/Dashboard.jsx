import { useEffect, useState } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
import Axiosinstance from '../components/Axiosinstance'

function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);

  const Getdata = () => {
    Axiosinstance.get('/users/')
      .then((response) => {
        setData(response.data);
        setloading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
      });
  }

  useEffect(() => {
    Getdata();
  }, []);

  return (
    <>
      {loading ? (
        // <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        // Loading.............  <CircularProgress />
        // </Box>
        <Box 
  display="flex" 
  justifyContent="center" 
  alignItems="center" 
  minHeight="200px"
  gap={2}  // Adds space between text and spinner
>
  <Typography variant="body1">Loading</Typography>
  <CircularProgress size={24} />
</Box>
        
      ) : (
        <div>
          {data.map((item, index) => (
            <Box key={index} sx={{ padding: 2, border: '1px solid #ccc', margin: 2 }}>
              <h3>User_id {item.id}</h3>
              <p>Email: {item.email}</p>
              <p>Full Name: {item.full_name}</p>
            </Box>
          ))}
        </div>
      )}
    </>
  )
}

export default Dashboard
