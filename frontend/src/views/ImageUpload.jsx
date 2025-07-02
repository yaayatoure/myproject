// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import Axiosinstance from '../components/Axiosinstance';

// const ImageUpload = () => {
//   // Formik setup with Yup validation
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
//       formData.append('image', values.image); // Field name must match Django's

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

//   // Preview logic
//   const previewUrl = formik.values.image 
//     ? URL.createObjectURL(formik.values.image) 
//     : null;

//   return (
//     <div className="upload-container">
//       <h2>Image Upload</h2>
//       <form onSubmit={formik.handleSubmit}>
//         <input
//           id="image"
//           name="image"
//           type="file"
//           accept="image/jpeg, image/png"
//           onChange={(event) => {
//             formik.setFieldValue('image', event.currentTarget.files[0]);
//           }}
//         />
        
//         {/* Validation error */}
//         {formik.errors.image && (
//           <div className="error">{formik.errors.image}</div>
//         )}

//         {/* Image preview */}
//         {previewUrl && (
//           <div className="preview">
//             <img src={previewUrl} alt="Preview" style={{ maxWidth: '300px' }} />
//           </div>
//         )}

//         <button type="submit" disabled={!formik.values.image || formik.isSubmitting}>
//           {formik.isSubmitting ? 'Uploading...' : 'Upload Image'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ImageUpload;
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Axiosinstance from '../components/Axiosinstance';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

import '../App.css';

const ImageUpload = () => {
  const [uploadStatus, setUploadStatus] = useState({
    success: null,
    message: ''
  });

  const formik = useFormik({
    initialValues: {
      image: null,
    },
    validationSchema: Yup.object({
      image: Yup.mixed()
        .required('File is required')
        .test('fileSize', 'File too large (max 5MB)', (value) => 
          value && value.size <= 5 * 1024 * 1024
        )
        .test('fileType', 'Only JPEG/PNG allowed', (value) => 
          value && ['image/jpeg', 'image/png'].includes(value.type)
        ),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('image', values.image);

      try {
        const response = await Axiosinstance.post('/photos/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        setUploadStatus({
          success: true,
          message: 'Image uploaded successfully!'
        });
        
        // Reset form after 3 seconds
        setTimeout(() => {
          formik.resetForm();
          setUploadStatus({ success: null, message: '' });
        }, 3000);

      } catch (error) {
        setUploadStatus({
          success: false,
          message: error.response?.data?.message || 'Upload failed!'
        });
      }
    },
  });

  const previewUrl = formik.values.image 
    ? URL.createObjectURL(formik.values.image) 
    : null;

  return (
    <div className="upload-container">
      <h2>Image Upload</h2>
      
      {/* Status Messages */}
      {uploadStatus.success !== null && (
        <div className={`status-message ${uploadStatus.success ? 'success' : 'error'}`}>
          {uploadStatus.success ? (
            <CheckCircleIcon className="status-icon" />
          ) : (
            <ErrorIcon className="status-icon" />
          )}
          <span>{uploadStatus.message}</span>
        </div>
      )}

      <form onSubmit={formik.handleSubmit}>
        <div className="file-input-container">
          <input
            id="image"
            name="image"
            type="file"
            accept="image/jpeg, image/png"
            onChange={(event) => {
              formik.setFieldValue('image', event.currentTarget.files[0]);
              setUploadStatus({ success: null, message: '' }); // Clear status on new file selection
            }}
          />
          <label htmlFor="image" className="file-input-label">
            Choose Image
          </label>
        </div>
        
        {formik.errors.image && (
          <div className="validation-error">{formik.errors.image}</div>
        )}

        {previewUrl && (
          <div className="preview-section">
            <h4>Preview</h4>
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="preview-image"
            />
          </div>
        )}

        <button 
          type="submit" 
          className="upload-btn"
          disabled={!formik.values.image || formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>
    </div>
  );
};

export default ImageUpload;