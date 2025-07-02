// import { useEffect, useState } from 'react';
// import Axiosinstance from '../components/Axiosinstance';
// import { format } from 'date-fns';
// // import './UserGallery.css';
// import {
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   CircularProgress,
//   Box
// } from '@mui/material';

// const UserGallery = () => {
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserImages = async () => {
//       try {
//         const response = await Axiosinstance.get('/user-photos/');
//         setImages(response.data);
//       } catch (error) {
//         console.error('Error fetching images:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserImages();
//   }, []);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" mt={4}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (images.length === 0) {
//     return (
//       <Typography variant="h6" align="center" mt={4}>
//         No images uploaded yet
//       </Typography>
//     );
//   }

//   return (
//     <Box sx={{ flexGrow: 1, p: 3 }}>
//       <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'medium' }}>
//         Your Gallery
//       </Typography>
      
//       <Grid container spacing={3}>
//         {images.map((image) => (
//           <Grid item xs={12} sm={6} md={4} key={image.id}>
//             <Card sx={{ 
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               borderRadius: 2,
//               boxShadow: 3,
//               transition: 'transform 0.2s',
//               '&:hover': {
//                 transform: 'scale(1.02)'
//               }
//             }}>
//               <CardMedia
//                 component="img"
//                 height="240"
//                 image={image.image}
//                 alt={`Uploaded by you on ${image.created_at}`}
//                 sx={{
//                   objectFit: 'cover',
//                   borderTopLeftRadius: 8,
//                   borderTopRightRadius: 8
//                 }}
//               />
//               <CardContent sx={{ flexGrow: 1 }}>
//                 <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//                   {format(new Date(image.created_at), 'MMMM d, yyyy - h:mm a')}
//                 </Typography>
//                 {image.caption && (
//                   <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
//                     "{image.caption}"
//                   </Typography>
//                 )}
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default UserGallery;
// labadan kore iyo hoose way shaqaynayan
// import { useEffect, useState } from 'react';
// import Axiosinstance from '../components/Axiosinstance';
// import { format } from 'date-fns';
// import {
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   CircularProgress,
//   Box
// } from '@mui/material';
// import './UserGallery.css';

// const UserGallery = () => {
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserImages = async () => {
//       try {
//         const response = await Axiosinstance.get('/api/user-photos/');
//         setImages(response.data);
//       } catch (error) {
//         console.error('Error fetching images:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserImages();
//   }, []);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" mt={4}>
//         <CircularProgress size={60} />
//       </Box>
//     );
//   }

//   if (images.length === 0) {
//     return (
//       <Typography 
//         variant="h5" 
//         align="center" 
//         mt={4}
//         color="textSecondary"
//       >
//         No images uploaded yet
//       </Typography>
//     );
//   }

//   return (
//     <Box sx={{ 
//       flexGrow: 1, 
//       p: { xs: 2, sm: 3 },
//       maxWidth: '1400px',
//       margin: '0 auto'
//     }}>
//       <Typography 
//         variant="h4" 
//         gutterBottom 
//         sx={{ 
//           mb: 4, 
//           fontWeight: 'medium',
//           color: 'primary.main'
//         }}
//       >
//         Your Gallery
//       </Typography>
      
//       <Grid container spacing={3}>
//         {images.map((image, index) => (
//           <Grid 
//             item 
//             xs={12} 
//             sm={6} 
//             md={4} 
//             lg={3} 
//             key={image.id}
//             className="gallery-item"
//             style={{ animationDelay: `${index * 0.1}s` }}
//           >
//             <Card sx={{ 
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               borderRadius: 2,
//               boxShadow: 3,
//               transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//               '&:hover': {
//                 transform: 'translateY(-5px)',
//                 boxShadow: 6
//               }
//             }}>
//               <Box sx={{
//                 position: 'relative',
//                 paddingTop: '56.25%', // 16:9 aspect ratio
//                 overflow: 'hidden',
//                 borderTopLeftRadius: 8,
//                 borderTopRightRadius: 8
//               }}>
//                 <img 
//                   src={image.image} 
//                   alt={image.caption || `Uploaded on ${format(new Date(image.created_at), 'MMMM d, yyyy')}`}
//                   loading="lazy"
//                   style={{
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     width: '100%',
//                     height: '100%',
//                     objectFit: 'cover'
//                   }}
//                 />
//               </Box>
//               <CardContent sx={{ flexGrow: 1 }}>
//                 <Typography 
//                   variant="caption" 
//                   color="text.secondary"
//                   sx={{ 
//                     display: 'block',
//                     mb: 1,
//                     fontSize: '0.75rem'
//                   }}
//                 >
//                   {format(new Date(image.created_at), 'MMMM d, yyyy - h:mm a')}
//                 </Typography>
//                 {image.caption && (
//                   <Typography 
//                     variant="body1" 
//                     sx={{ 
//                       fontStyle: 'italic',
//                       lineHeight: 1.3,
//                       display: '-webkit-box',
//                       WebkitLineClamp: 2,
//                       WebkitBoxOrient: 'vertical',
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis'
//                     }}
//                   >
//                     {image.caption}
//                   </Typography>
//                 )}
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default UserGallery;

//kan hoose wuu shaqaynayaa lkn waxa raba in imageka marki la taabto in isagoo full ah la arko

// import { useEffect, useState } from 'react';
// import Axiosinstance from '../components/Axiosinstance';
// import { format } from 'date-fns';
// import {
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   CircularProgress,
//   Box
// } from '@mui/material';
// import './UserGallery.css';

// const UserGallery = () => {
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserImages = async () => {
//       try {
//         const response = await Axiosinstance.get('/user-photos/');
//         setImages(response.data);
//       } catch (error) {
//         console.error('Error fetching images:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserImages();
//   }, []);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" mt={4}>
//         <CircularProgress size={60} />
//       </Box>
//     );
//   }

//   if (images.length === 0) {
//     return (
//       <Typography 
//         variant="h5" 
//         align="center" 
//         mt={4}
//         color="textSecondary"
//       >
//         No images uploaded yet
//       </Typography>
//     );
//   }

//   return (
//     <Box sx={{ 
//       flexGrow: 1, 
//       p: { xs: 2, sm: 3 },
//       maxWidth: '1400px',
//       margin: '0 auto'
//     }}>
//       <Typography 
//         variant="h4" 
//         gutterBottom 
//         sx={{ 
//           mb: 4, 
//           fontWeight: 'medium',
//           color: 'primary.main'
//         }}
//       >
//         Your Gallery
//       </Typography>
      
//       <Grid container spacing={3}>
//         {images.map((image, index) => (
//           <Grid 
//             item 
//             xs={12} 
//             sm={6} 
//             md={4} 
//             lg={3} 
//             key={image.id}
//             className="gallery-item"
//             style={{ animationDelay: `${index * 0.1}s` }}
//           >
//             <Card sx={{ 
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               borderRadius: 2,
//               boxShadow: 3,
//               transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//               '&:hover': {
//                 transform: 'translateY(-5px)',
//                 boxShadow: 6
//               }
//             }}>
//               <Box sx={{
//                 position: 'relative',
//                 paddingTop: '56.25%', // 16:9 aspect ratio
//                 overflow: 'hidden',
//                 borderTopLeftRadius: 8,
//                 borderTopRightRadius: 8
//               }}>
//                 <img 
//                   src={image.image} 
//                   alt={image.caption || `Uploaded on ${format(new Date(image.created_at), 'MMMM d, yyyy')}`}
//                   loading="lazy"
//                   style={{
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     width: '100%',
//                     height: '100%',
//                     objectFit: 'cover'
//                   }}
//                 />
//               </Box>
//               <CardContent sx={{ flexGrow: 1 }}>
//                 <Typography 
//                   variant="caption" 
//                   color="text.secondary"
//                   sx={{ 
//                     display: 'block',
//                     mb: 1,
//                     fontSize: '0.75rem'
//                   }}
//                 >
//                   {format(new Date(image.created_at), 'MMMM d, yyyy - h:mm a')}
//                 </Typography>
//                 {image.caption && (
//                   <Typography 
//                     variant="body1" 
//                     sx={{ 
//                       fontStyle: 'italic',
//                       lineHeight: 1.3,
//                       display: '-webkit-box',
//                       WebkitLineClamp: 2,
//                       WebkitBoxOrient: 'vertical',
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis'
//                     }}
//                   >
//                     {image.caption}
//                   </Typography>
//                 )}
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default UserGallery;

import { useEffect, useState } from 'react';
import Axiosinstance from '../components/Axiosinstance';
import { format } from 'date-fns';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Modal,
  Backdrop,
  Fade,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './UserGallery.css';

const UserGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchUserImages = async () => {
      try {
        const response = await Axiosinstance.get('/user-photos/');
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserImages();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (images.length === 0) {
    return (
      <Typography 
        variant="h5" 
        align="center" 
        mt={4}
        color="textSecondary"
      >
        No images uploaded yet
      </Typography>
    );
  }

  return (
    <Box sx={{ 
      flexGrow: 1, 
      p: { xs: 2, sm: 3 },
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          mb: 4, 
          fontWeight: 'medium',
          color: 'primary.main'
        }}
      >
        Your Gallery
      </Typography>
      
      <Grid container spacing={3}>
        {images.map((image, index) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={4} 
            lg={3} 
            key={image.id}
            className="gallery-item"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Card 
              onClick={() => setSelectedImage(image)}
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                boxShadow: 3,
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6
                }
              }}
            >
              <Box sx={{
                position: 'relative',
                paddingTop: '56.25%', // 16:9 aspect ratio
                overflow: 'hidden',
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8
              }}>
                <img 
                  src={image.image} 
                  alt={image.caption || `Uploaded on ${format(new Date(image.created_at), 'MMMM d, yyyy')}`}
                  loading="lazy"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ 
                    display: 'block',
                    mb: 1,
                    fontSize: '0.75rem'
                  }}
                >
                  {format(new Date(image.created_at), 'MMMM d, yyyy - h:mm a')}
                </Typography>
                {image.caption && (
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontStyle: 'italic',
                      lineHeight: 1.3,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {image.caption}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Full Image Modal */}
      <Modal
        open={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={!!selectedImage}>
          <Box sx={modalStyle}>
            <IconButton
              onClick={() => setSelectedImage(null)}
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' }
              }}
            >
              <CloseIcon />
            </IconButton>
            {selectedImage && (
              <img
                src={selectedImage.image}
                alt="Full view"
                style={{
                  maxWidth: '100%',
                  maxHeight: '90vh',
                  borderRadius: 8
                }}
              />
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

// Modal style
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  outline: 'none',
  maxWidth: '95vw',
  maxHeight: '95vh',
  boxShadow: 24,
  p: 2,
  bgcolor: 'background.paper',
  borderRadius: '12px',
  textAlign: 'center',
};

export default UserGallery;
