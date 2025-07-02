
// import React, { useState, useEffect } from 'react';
// import axios from '../components/Axiosinstance';
// import {
//   Box,
//   TextField,
//   Avatar,
//   Typography,
//   CircularProgress
// } from '@mui/material';

// function Home() {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch users based on search term
//   const fetchUsers = async (searchTerm) => {
//     try {
//       const response = await axios.get(`/public-search/?query=${searchTerm}`);
//       setResults(response.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   // Debounce input
//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       if (query.trim() !== '') {
//         setLoading(true);
//         fetchUsers(query).finally(() => setLoading(false));
//       } else {
//         setResults([]);
//       }
//     }, 500);

//     return () => clearTimeout(delayDebounce);
//   }, [query]);

//   // Auto-refresh if user is actively searching
//   useEffect(() => {
//     if (!query.trim()) return;

//     const interval = setInterval(() => {
//       fetchUsers(query);
//     }, 5000); // Refresh every 5 seconds

//     return () => clearInterval(interval);
//   }, [query]);

//   return (
//     <Box p={3} maxWidth="600px" mx="auto">
//       <TextField
//         fullWidth
//         label="Search for users"
//         variant="outlined"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         sx={{ marginBottom: 3 }}
//       />

//       {loading ? (
//         <CircularProgress />
//       ) : (
//         results.map(user => (
//           <Box
//             key={user.id}
//             display="flex"
//             alignItems="flex-start"
//             borderBottom="1px solid #ccc"
//             padding="10px 0"
//           >
//             <Avatar
//   src={
//     user.profile_picture?.startsWith('/')
//       ? `http://127.0.0.1:8000${user.profile_picture}`
//       : user.profile_picture
//   }
//   alt={user.username}
//   sx={{
//     marginRight: 2,
//     bgcolor: !user.profile_picture && 'primary.main',
//     color: 'white'
//   }}
// >
//   {user.username.charAt(0).toUpperCase()}
// </Avatar>
//             <Box>
//               <Typography variant="subtitle1">{user.username}</Typography>
//               <Typography variant="body2" color="textSecondary">
//                 {user.email}
//               </Typography>

//               {user.image && (
//                 <>
//                   <img
//                     src={user.image}
//                     alt="User upload"
//                     style={{
//                       width: '100px',
//                       marginTop: '8px',
//                       borderRadius: '8px',
//                       display: 'block'
//                     }}
//                   />
//                   <Typography
//                     variant="caption"
//                     color="textSecondary"
//                     sx={{ display: 'block', marginTop: '4px' }}
//                   >
//                     Uploaded: {new Date(user.created_at).toLocaleString()}
//                   </Typography>
//                 </>
//               )}
//             </Box>
//           </Box>
//         ))
//       )}
//     </Box>
//   );
// }

// export default Home;
import React, { useState, useEffect } from 'react';
import axios from '../components/Axiosinstance';
import {
  Box,
  TextField,
  Avatar,
  Typography,
  CircularProgress,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = async (searchTerm) => {
    try {
      const response = await axios.get(`/public-search/?query=${searchTerm}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim() !== '') {
        setLoading(true);
        fetchUsers(query).finally(() => setLoading(false));
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  useEffect(() => {
    if (!query.trim()) return;

    const interval = setInterval(() => {
      fetchUsers(query);
    }, 5000);

    return () => clearInterval(interval);
  }, [query]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'linear-gradient(90deg, rgba(42, 123, 155, 1) 0%, rgba(199, 87, 134, 1) 98%)',
        padding: 4,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '800px',
          backgroundColor: 'white',
          borderRadius: 2,
          padding: 4,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
          Public Photo Search
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center" mb={3}>
          <Button variant="outlined" color="primary" onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button variant="contained" color="secondary" onClick={() => navigate('/register')}>
            Register
          </Button>
        </Stack>

        <TextField
          fullWidth
          label="Search for users"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ marginBottom: 3 }}
        />

        {loading ? (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress />
          </Box>
        ) : (
          results.map((user) => (
            <Box
              key={user.id}
              display="flex"
              alignItems="flex-start"
              borderBottom="1px solid #ccc"
              padding="10px 0"
              sx={{ cursor: 'pointer' }}
              onClick={() => handleUserClick(user)}
            >
              <Avatar
                src={
                  user.profile_picture?.startsWith('/')
                    ? `http://127.0.0.1:8000${user.profile_picture}`
                    : user.profile_picture
                }
                alt={user.username}
                sx={{
                  marginRight: 2,
                  bgcolor: !user.profile_picture && 'primary.main',
                  color: 'white',
                }}
              >
                {!user.profile_picture && user.username.charAt(0).toUpperCase()}
              </Avatar>

              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {user.username}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {user.email}
                </Typography>

                {user.image && (
                  <>
                    <img
                      src={user.image}
                      alt="User upload"
                      style={{
                        width: '100px',
                        marginTop: '8px',
                        borderRadius: '8px',
                        display: 'block',
                      }}
                    />
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{ display: 'block', marginTop: '4px' }}
                    >
                      Uploaded: {new Date(user.created_at).toLocaleString()}
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
          ))
        )}
      </Box>

      {/* Modal for selected user */}
      <Dialog open={!!selectedUser} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedUser?.username}'s Details
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar
              src={
                selectedUser?.profile_picture?.startsWith('/')
                  ? `http://127.0.0.1:8000${selectedUser.profile_picture}`
                  : selectedUser?.profile_picture
              }
              alt={selectedUser?.username}
              sx={{ width: 60, height: 60, marginRight: 2 }}
            >
              {!selectedUser?.profile_picture &&
                selectedUser?.username.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h6">{selectedUser?.username}</Typography>
              <Typography color="textSecondary">{selectedUser?.email}</Typography>
            </Box>
          </Box>

          {selectedUser?.image && (
            <>
              <img
                src={selectedUser.image}
                alt="Uploaded"
                style={{ width: '100%', borderRadius: '8px' }}
              />
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ display: 'block', marginTop: '8px' }}
              >
                Uploaded: {new Date(selectedUser.created_at).toLocaleString()}
              </Typography>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Home;
