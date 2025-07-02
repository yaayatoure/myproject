// import React, { useRef, useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import Axiosinstance from '../components/Axiosinstance';

// const ImageUpload = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [previewUrl, setPreviewUrl] = useState(null);

//   // Start the webcam
//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       videoRef.current.srcObject = stream;
//     } catch (err) {
//       console.error('Camera access error:', err);
//       alert('Could not access camera');
//     }
//   };

//   // Capture photo from video and set it in formik
//   const capturePhoto = () => {
//     const canvas = canvasRef.current;
//     const video = videoRef.current;

//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     const ctx = canvas.getContext('2d');
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//     canvas.toBlob((blob) => {
//       const file = new File([blob], 'captured.jpg', { type: 'image/jpeg' });
//       formik.setFieldValue('image', file);
//       setPreviewUrl(URL.createObjectURL(file));
//     }, 'image/jpeg');
//   };

//   // Formik logic
//   const formik = useFormik({
//     initialValues: {
//       image: null,
//     },
//     validationSchema: Yup.object({
//       image: Yup.mixed()
//         .required('File is required')
//         .test('fileSize', 'File too large (max 5MB)', (value) =>
//           value && value.size <= 5 * 1024 * 1024
//         )
//         .test('fileType', 'Only JPEG/PNG allowed', (value) =>
//           value && ['image/jpeg', 'image/png'].includes(value.type)
//         ),
//     }),
//     onSubmit: async (values) => {
//       const formData = new FormData();
//       formData.append('image', values.image);

//       try {
//         const response = await Axiosinstance.post('/photos/', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         alert('Upload successful!');
//         console.log('Server response:', response.data);
//       } catch (error) {
//         console.error('Upload failed:', error);
//         alert('Upload failed!');
//       }
//     },
//   });

//   return (
//     <div>
//       <h2>Capture or Upload Photo</h2>

//       {/* Camera Section */}
//       <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxHeight: 300 }} />
//       <canvas ref={canvasRef} style={{ display: 'none' }} />
//       <div>
//         <button onClick={startCamera}>Start Camera</button>
//         <button onClick={capturePhoto}>Capture Photo</button>
//       </div>

//       {/* Upload Form */}
//       <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
//         <input
//           type="file"
//           name="image"
//           accept="image/jpeg, image/png"
//           onChange={(event) => {
//             const file = event.currentTarget.files[0];
//             formik.setFieldValue('image', file);
//             setPreviewUrl(URL.createObjectURL(file));
//           }}
//         />
//         {formik.errors.image && formik.touched.image && (
//           <div style={{ color: 'red' }}>{formik.errors.image}</div>
//         )}

//         {/* Preview */}
//         {previewUrl && (
//           <div>
//             <h4>Preview:</h4>
//             <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
//           </div>
//         )}

//         <button type="submit" disabled={!formik.values.image}>
//           Upload Photo
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ImageUpload;

//waa kii saxda ahaa kan kore

// import React, { useRef, useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import Axiosinstance from '../components/Axiosinstance';

// const ImageUpload = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [message, setMessage] = useState('');
//   const [messageType, setMessageType] = useState(''); // 'success' or 'error'

//   // Start the webcam
//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       videoRef.current.srcObject = stream;
//     } catch (err) {
//       console.error('Camera access error:', err);
//       setMessage('Could not access camera. Please allow permission.');
//       setMessageType('error');
//       scrollToStatus();
//     }
//   };

//   // Capture photo from video and set it in formik
//   const capturePhoto = () => {
//     const canvas = canvasRef.current;
//     const video = videoRef.current;

//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     const ctx = canvas.getContext('2d');
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//     canvas.toBlob((blob) => {
//       const file = new File([blob], 'captured.jpg', { type: 'image/jpeg' });
//       formik.setFieldValue('image', file);
//       setPreviewUrl(URL.createObjectURL(file));
//       setMessage('');
//       setMessageType('');
//     }, 'image/jpeg');
//   };

//   // Cancel/reset image
//   const cancelPhoto = () => {
//     formik.resetForm();
//     setPreviewUrl(null);
//     setMessage('');
//     setMessageType('');
//   };

//   // Scroll to the message area
//   const scrollToStatus = () => {
//     setTimeout(() => {
//       const statusElement = document.getElementById('upload-status');
//       if (statusElement) {
//         statusElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       }
//     }, 100);
//   };

//   // Formik logic
//   const formik = useFormik({
//     initialValues: {
//       image: null,
//     },
//     validationSchema: Yup.object({
//       image: Yup.mixed()
//         .required('You must capture a photo')
//         .test('fileSize', 'File too large (max 5MB)', (value) =>
//           value && value.size <= 5 * 1024 * 1024
//         )
//         .test('fileType', 'Only JPEG/PNG allowed', (value) =>
//           value && ['image/jpeg', 'image/png'].includes(value.type)
//         ),
//     }),
//     onSubmit: async (values) => {
//       const formData = new FormData();
//       formData.append('image', values.image);

//       try {
//         const response = await Axiosinstance.post('/photos/', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         setMessage('✅ Upload successful!');
//         setMessageType('success');
//         cancelPhoto();
//         scrollToStatus();
//       } catch (error) {
//         console.error('Upload failed:', error);
//         setMessage('❌ Upload failed. Please try again.');
//         setMessageType('error');
//         scrollToStatus();
//       }
//     },
//   });

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>📸 Capture and Upload Photo</h2>

//       {/* Camera Video */}
//       <video ref={videoRef} autoPlay playsInline style={styles.video} />
//       <canvas ref={canvasRef} style={{ display: 'none' }} />

//       {/* Camera Controls */}
//       <div style={styles.buttonGroup}>
//         <button onClick={startCamera} style={styles.button}>Start Camera</button>
//         <button onClick={capturePhoto} style={styles.button}>Capture Photo</button>
//         <button onClick={cancelPhoto} style={{ ...styles.button, backgroundColor: '#888' }}>
//           Cancel
//         </button>
//       </div>

//       {/* Preview Image */}
//       {previewUrl && (
//         <div style={{ marginTop: '1rem', textAlign: 'center' }}>
//           <h4>Preview:</h4>
//           <img src={previewUrl} alt="Preview" style={styles.preview} />
//         </div>
//       )}

//       {/* Upload Form */}
//       <form onSubmit={formik.handleSubmit} encType="multipart/form-data" style={{ marginTop: '1rem' }}>
//         {/* Error from validation */}
//         {formik.errors.image && formik.touched.image && (
//           <div style={styles.error}>{formik.errors.image}</div>
//         )}

//         <button
//           type="submit"
//           disabled={!formik.values.image}
//           style={{ ...styles.button, width: '100%', marginTop: '10px', backgroundColor: '#28a745' }}
//         >
//           Upload Photo
//         </button>
//       </form>

//       {/* Status Message */}
//       {message && (
//         <div
//           id="upload-status"
//           style={{
//             ...styles.status,
//             backgroundColor: messageType === 'success' ? '#d4edda' : '#f8d7da',
//             color: messageType === 'success' ? '#155724' : '#721c24',
//             border: messageType === 'success' ? '1px solid #c3e6cb' : '1px solid #f5c6cb',
//           }}
//         >
//           {message}
//         </div>
//       )}
//     </div>
//   );
// };

// // Styling
// const styles = {
//   container: {
//     maxWidth: '480px',
//     margin: '2rem auto',
//     padding: '1.5rem',
//     borderRadius: '10px',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//     fontFamily: 'Arial, sans-serif',
//     backgroundColor: '#fdfdfd',
//   },
//   heading: {
//     textAlign: 'center',
//     marginBottom: '1rem',
//   },
//   video: {
//     width: '100%',
//     maxHeight: '300px',
//     borderRadius: '10px',
//     objectFit: 'cover',
//     boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
//   },
//   preview: {
//     width: '100%',
//     borderRadius: '10px',
//     boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
//   },
//   buttonGroup: {
//     marginTop: '1rem',
//     display: 'flex',
//     justifyContent: 'space-between',
//     flexWrap: 'wrap',
//     gap: '0.5rem',
//   },
//   button: {
//     padding: '10px 15px',
//     backgroundColor: '#007bff',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '6px',
//     cursor: 'pointer',
//     flex: 1,
//     textAlign: 'center',
//   },
//   error: {
//     color: 'red',
//     marginTop: '0.5rem',
//     textAlign: 'center',
//   },
//   status: {
//     marginTop: '1rem',
//     padding: '1rem',
//     borderRadius: '6px',
//     textAlign: 'center',
//     fontWeight: 'bold',
//     fontSize: '16px',
//     transition: 'all 0.3s ease',
//     boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
//   },
// };

// export default ImageUpload;

//kan kore waa second
// import React, { useRef, useState, useEffect } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import Axiosinstance from '../components/Axiosinstance';
// import '../App.css';

// const CameraUpload = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [isCameraActive, setIsCameraActive] = useState(false);

//   // Clean up camera stream on unmount
//   useEffect(() => {
//     return () => {
//       if (videoRef.current?.srcObject) {
//         videoRef.current.srcObject.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, []);

//   const startCamera = async () => {
//     setError(null);
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ 
//         video: { 
//           facingMode: 'environment',
//           width: { ideal: 1280 },
//           height: { ideal: 720 }
//         } 
//       });
//       videoRef.current.srcObject = stream;
//       setIsCameraActive(true);
//     } catch (err) {
//       console.error('Camera access error:', err);
//       setError('Could not access camera. Please check permissions.');
//     }
//   };

//   const stopCamera = () => {
//     if (videoRef.current?.srcObject) {
//       videoRef.current.srcObject.getTracks().forEach(track => track.stop());
//       videoRef.current.srcObject = null;
//       setIsCameraActive(false);
//     }
//   };

//   const capturePhoto = () => {
//     try {
//       const canvas = canvasRef.current;
//       const video = videoRef.current;

//       if (!video.videoWidth || !video.videoHeight) {
//         throw new Error('Camera stream not ready');
//       }

//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       const ctx = canvas.getContext('2d');
//       ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//       canvas.toBlob((blob) => {
//         const file = new File([blob], `photo-${Date.now()}.jpg`, { 
//           type: 'image/jpeg',
//           lastModified: Date.now()
//         });
//         formik.setFieldValue('image', file);
//         setPreviewUrl(URL.createObjectURL(blob));
//       }, 'image/jpeg', 0.9);
//     } catch (err) {
//       console.error('Capture error:', err);
//       setError(err.message);
//     }
//   };

//   const formik = useFormik({
//     initialValues: {
//       image: null,
//     },
//     validationSchema: Yup.object({
//       image: Yup.mixed()
//         .required('Photo is required')
//         .test('fileSize', 'File too large (max 5MB)', (value) =>
//           value && value.size <= 5 * 1024 * 1024
//         )
//     }),
//     onSubmit: async (values) => {
//       setError(null);
//       setSuccess(null);
      
//       try {
//         const formData = new FormData();
//         formData.append('image', values.image);

//         await Axiosinstance.post('/photos/', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
        
//         setSuccess('Photo uploaded successfully!');
//         formik.resetForm();
//         setPreviewUrl(null);
//         stopCamera();
//       } catch (error) {
//         console.error('Upload failed:', error);
//         setError(error.response?.data?.message || 'Upload failed. Please try again.');
//       }
//     },
//   });

//   return (
//     <div className="camera-upload-container">
//       <h2 className="title">Camera Upload</h2>

//       {/* Status Messages */}
//       {error && (
//         <div className="error-message">
//           <span className="error-icon">⚠</span>
//           {error}
//         </div>
//       )}
      
//       {success && (
//         <div className="success-message">
//           <span className="success-icon">✓</span>
//           {success}
//         </div>
//       )}

//       {/* Camera Section */}
//       <div className="camera-preview">
//         <video 
//           ref={videoRef} 
//           autoPlay 
//           playsInline 
//           muted 
//           className="video-element"
//         />
//         {!isCameraActive && (
//           <div className="camera-placeholder">
//             <div className="placeholder-icon">📷</div>
//             <p>Camera is not active</p>
//           </div>
//         )}
//         <canvas ref={canvasRef} style={{ display: 'none' }} />
//       </div>

//       {/* Camera Controls */}
//       <div className="camera-controls">
//         {!isCameraActive ? (
//           <button 
//             onClick={startCamera}
//             className="btn btn-start"
//           >
//             Start Camera
//           </button>
//         ) : (
//           <>
//             <button 
//               onClick={capturePhoto}
//               className="btn btn-capture"
//             >
//               Capture Photo
//             </button>
//             <button 
//               onClick={stopCamera}
//               className="btn btn-stop"
//             >
//               Stop Camera
//             </button>
//           </>
//         )}
//       </div>

//       {/* Preview Section */}
//       {previewUrl && (
//         <div className="preview-section">
//           <h3 className="preview-title">Captured Photo</h3>
//           <img 
//             src={previewUrl} 
//             alt="Preview" 
//             className="preview-image"
//             onError={() => setError('Failed to load preview')}
//           />
//           <button 
//             type="button"
//             onClick={formik.handleSubmit}
//             className="btn btn-upload"
//             disabled={formik.isSubmitting}
//           >
//             {formik.isSubmitting ? 'Uploading...' : 'Upload Photo'}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CameraUpload;
//kan kore waa shaqaynaya mirroringka ka qaldan
import React, { useRef, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Axiosinstance from '../components/Axiosinstance';
import '../App.css';

const CameraUpload = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Clean up camera stream on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      videoRef.current.srcObject = stream;
      setIsCameraActive(true);
    } catch (err) {
      console.error('Camera access error:', err);
      setError('Could not access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    try {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      if (!video.videoWidth || !video.videoHeight) {
        throw new Error('Camera stream not ready');
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      
      // Remove mirror effect by flipping the context horizontally
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform

      canvas.toBlob((blob) => {
        const file = new File([blob], `photo-${Date.now()}.jpg`, { 
          type: 'image/jpeg',
          lastModified: Date.now()
        });
        formik.setFieldValue('image', file);
        setPreviewUrl(URL.createObjectURL(blob));
      }, 'image/jpeg', 0.9);
    } catch (err) {
      console.error('Capture error:', err);
      setError(err.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      image: null,
    },
    validationSchema: Yup.object({
      image: Yup.mixed()
        .required('Photo is required')
        .test('fileSize', 'File too large (max 5MB)', (value) =>
          value && value.size <= 5 * 1024 * 1024
        )
    }),
    onSubmit: async (values) => {
      setError(null);
      setSuccess(null);
      
      try {
        const formData = new FormData();
        formData.append('image', values.image);

        await Axiosinstance.post('/photos/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        setSuccess('Photo uploaded successfully!');
        formik.resetForm();
        setPreviewUrl(null);
        stopCamera();
      } catch (error) {
        console.error('Upload failed:', error);
        setError(error.response?.data?.message || 'Upload failed. Please try again.');
      }
    },
  });

  return (
    <div className="camera-upload-container">
      <h2 className="title">Camera Upload</h2>

      {/* Status Messages */}
      {error && (
        <div className="error-message">
          <span className="error-icon">⚠</span>
          {error}
        </div>
      )}
      
      {success && (
        <div className="success-message">
          <span className="success-icon">✓</span>
          {success}
        </div>
      )}

      {/* Camera Section */}
      <div className="camera-preview">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="video-element"
          style={{ transform: 'scaleX(-1)' }} 
        />
        {!isCameraActive && (
          <div className="camera-placeholder">
            <div className="placeholder-icon">📷</div>
            <p>Camera is not active</p>
          </div>
        )}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>

      {/* Camera Controls */}
      <div className="camera-controls">
        {!isCameraActive ? (
          <button 
            onClick={startCamera}
            className="btn btn-start"
          >
            Start Camera
          </button>
        ) : (
          <>
            <button 
              onClick={capturePhoto}
              className="btn btn-capture"
            >
              Capture Photo
            </button>
            <button 
              onClick={stopCamera}
              className="btn btn-stop"
            >
              Stop Camera
            </button>
          </>
        )}
      </div>

      {/* Preview Section */}
      {previewUrl && (
        <div className="preview-section">
          <h3 className="preview-title">Captured Photo</h3>
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="preview-image"
            onError={() => setError('Failed to load preview')}
          />
          <button 
            type="button"
            onClick={formik.handleSubmit}
            className="btn btn-upload"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Uploading...' : 'Upload Photo'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CameraUpload;