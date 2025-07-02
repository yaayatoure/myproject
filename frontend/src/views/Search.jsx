// import React, { useState, useEffect } from 'react';
// import axios from '../components/Axiosinstance'; // Uses your existing instance
// import {
//   Box,
//   TextField,
//   Avatar,
//   Typography,
//   CircularProgress
// } from '@mui/material';

// function Search() {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Debounce query input
//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       if (query.trim() !== '') {
//         fetchUsers(query);
//       } else {
//         setResults([]);
//       }
//     }, 500); // Delay to reduce API calls

//     return () => clearTimeout(delayDebounce);
//   }, [query]);

//   const fetchUsers = async (searchTerm) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`/public-search/?query=${searchTerm}`);
//       setResults(response.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

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
//             alignItems="center"
//             borderBottom="1px solid #ccc"
//             padding="10px 0"
//           >
//             <Avatar src={user.profile_picture} alt={user.username} sx={{ marginRight: 2 }} />
//             <Box>
//               <Typography variant="subtitle1">{user.username}</Typography>
//               <Typography variant="body2" color="textSecondary">{user.email}</Typography>
//               {user.image && (
//                 <img
//                   src={user.image}
//                   alt="User upload"
//                   style={{ width: '80px', marginTop: '5px', borderRadius: '8px' }}
//                 />
//               )}
//             </Box>
//           </Box>
//         ))
//       )}
//     </Box>
//   );
// }

// export default Search;

// kan hoose waa shaqaynaya waxa ku darayaa profileka inuu soo boxo
// import React, { useState, useEffect } from 'react';
// import axios from '../components/Axiosinstance';
// import {
//   Box,
//   TextField,
//   Avatar,
//   Typography,
//   CircularProgress
// } from '@mui/material';

// function Search() {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Function to fetch users
//   const fetchUsers = async (searchTerm) => {
//     try {
//       const response = await axios.get(`/public-search/?query=${searchTerm}`);
//       setResults(response.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   // Debounce on initial input
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

//   // Live auto-refresh when query is active
//   useEffect(() => {
//     if (!query.trim()) return;

//     const interval = setInterval(() => {
//       fetchUsers(query); // Refresh results every 5 seconds
//     }, 5000);

//     return () => clearInterval(interval); // Clean up
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
//             alignItems="center"
//             borderBottom="1px solid #ccc"
//             padding="10px 0"
//           >
//             <Avatar src={user.profile_picture} alt={user.username} sx={{ marginRight: 2 }} />
//             <Box>
//               <Typography variant="subtitle1">{user.username}</Typography>
//               <Typography variant="body2" color="textSecondary">{user.email}</Typography>
//               {user.image && (
//                 <>
//                   <img
//                     src={user.image}
//                     alt="User upload"
//                     style={{ width: '80px', marginTop: '5px', borderRadius: '8px' }}
//                   />
//                   <Typography variant="caption" color="textSecondary">
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

// export default Search;
//kan hoose waa kii udanbeeyay oo shaqaynayay lkn waxa rabaa ina ku soo daro in model soo boxo marki la taabto
// import React, { useState, useEffect } from 'react';
// import axios from '../components/Axiosinstance';
// import {
//   Box,
//   TextField,
//   Avatar,
//   Typography,
//   CircularProgress
// } from '@mui/material';

// function Search() {
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

// export default Search;
import React, { useState, useEffect } from 'react';
import axios from '../components/Axiosinstance';
import {
  Box,
  TextField,
  Avatar,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Modal target

  // Fetch users based on search term
  const fetchUsers = async (searchTerm) => {
    try {
      const response = await axios.get(`/public-search/?query=${searchTerm}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Debounce input
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

  // Auto-refresh if user is actively searching
  useEffect(() => {
    if (!query.trim()) return;

    const interval = setInterval(() => {
      fetchUsers(query);
    }, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, [query]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <Box p={3} maxWidth="600px" mx="auto">
      <TextField
        fullWidth
        label="Search for users"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ marginBottom: 3 }}
      />

      {loading ? (
        <CircularProgress />
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
              <Typography variant="subtitle1">{user.username}</Typography>
              <Typography variant="body2" color="textSecondary">
                {user.email}
              </Typography>
              {user.image && (
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
              )}
            </Box>
          </Box>
        ))
      )}

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
                  ? `http://127.0.0.1:8000${selectedUser?.profile_picture}`
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

export default Search;
