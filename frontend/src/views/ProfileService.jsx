
// import { useState, useEffect } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import Axiosinstance from "../components/Axiosinstance";
// import './ProfilePage.css';

// const ProfilePage = () => {
//   // State management
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editMode, setEditMode] = useState(false);

//   // Validation schema
//   const profileSchema = Yup.object().shape({
//     bio: Yup.string().max(500, 'Bio must be less than 500 characters'),
//     phone_number: Yup.string()
//       .matches(/^[0-9]+$/, "Must be only digits")
//       .min(10, 'Must be at least 10 digits')
//       .max(15, 'Must be less than 15 digits')
//   });

//   // Formik setup
//   const formik = useFormik({
//     initialValues: {
//       bio: '',
//       phone_number: ''
//     },
//     validationSchema: profileSchema,
//     enableReinitialize: true,
//     onSubmit: async (values, { setSubmitting }) => {
//       try {
//         // Create FormData object for Django backend
//         const formData = new FormData();
//         formData.append('bio', values.bio);
//         formData.append('phone_number', values.phone_number);

//         // Send with proper content type
//         await Axiosinstance.put('profile/', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           }
//         });

//         // Refresh profile data
//         const response = await Axiosinstance.get('profile/');
//         setProfile(response.data);
//         setEditMode(false);
//       } catch (error) {
//         console.error("Update failed:", error.response?.data || error.message);
//       } finally {
//         setSubmitting(false);
//       }
//     }
//   });

//   // Fetch profile data
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await Axiosinstance.get('profile/');
//         setProfile(response.data);
//         formik.setValues({
//           bio: response.data.bio || '',
//           phone_number: response.data.phone_number || ''
//         });
//       } catch (error) {
//         console.error("Fetch failed:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, []);

//   // Loading state
//   if (loading) return (
//     <div className="profile-loading">
//       <div className="loading-spinner"></div>
//       <p>Loading your profile...</p>
//     </div>
//   );

//   // Error state
//   if (!profile) return (
//     <div className="profile-error">
//       <h2>Profile Unavailable</h2>
//       <p>We couldn't load your profile data.</p>
//     </div>
//   );

//   return (
//     <div className="profile-container">
//       <div className="profile-header">
//         <div className="profile-avatar">
//           <img
//             src={profile.profile_picture || '/default-profile.jpg'}
//             alt="Profile"
//             onError={(e) => {
//               e.target.src = '/default-profile.jpg';
//             }}
//           />
//           <h1>{profile.username || profile.email.split('@')[0]}</h1>
//         </div>
        
//         {!editMode && (
//           <button 
//             className="edit-button"
//             onClick={() => setEditMode(true)}
//           >
//             Edit Profile
//           </button>
//         )}
//       </div>

//       {editMode ? (
//         <form onSubmit={formik.handleSubmit} className="edit-form">
//           <div className="form-group">
//             <label htmlFor="bio">Bio</label>
//             <textarea
//               id="bio"
//               name="bio"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.bio}
//               rows={4}
//               className={formik.touched.bio && formik.errors.bio ? 'error' : ''}
//             />
//             {formik.touched.bio && formik.errors.bio && (
//               <div className="error-message">{formik.errors.bio}</div>
//             )}
//           </div>

//           <div className="form-group">
//             <label htmlFor="phone_number">Phone Number</label>
//             <input
//               id="phone_number"
//               name="phone_number"
//               type="text"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.phone_number}
//               className={formik.touched.phone_number && formik.errors.phone_number ? 'error' : ''}
//             />
//             {formik.touched.phone_number && formik.errors.phone_number && (
//               <div className="error-message">{formik.errors.phone_number}</div>
//             )}
//           </div>

//           <div className="form-actions">
//             <button 
//               type="submit" 
//               className="save-button"
//               disabled={formik.isSubmitting}
//             >
//               {formik.isSubmitting ? 'Saving...' : 'Save Changes'}
//             </button>
//             <button 
//               type="button"
//               className="cancel-button"
//               onClick={() => {
//                 setEditMode(false);
//                 formik.resetForm();
//               }}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       ) : (
//         <div className="profile-details">
//           <div className="detail-card">
//             <div className="detail-icon">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
//                 <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
//               </svg>
//             </div>
//             <div className="detail-content">
//               <h3>Email</h3>
//               <p>{profile.email}</p>
//             </div>
//           </div>

//           <div className="detail-card">
//             <div className="detail-icon">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//                 <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
//               </svg>
//             </div>
//             <div className="detail-content">
//               <h3>Bio</h3>
//               <p>{profile.bio || 'No bio provided'}</p>
//             </div>
//           </div>

//           {profile.phone_number && (
//             <div className="detail-card">
//               <div className="detail-icon">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//                   <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <div className="detail-content">
//                 <h3>Phone</h3>
//                 <p>{profile.phone_number}</p>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;

// kan hoose wuu shaqaynaya ee profile previoga wax ku korniyaa
// import { useState, useEffect } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import Axiosinstance from "../components/Axiosinstance";
// import './ProfilePage.css';

// const ProfilePage = () => {
//   // State management
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editMode, setEditMode] = useState(false);

//   // Validation schema
//   const profileSchema = Yup.object().shape({
//     bio: Yup.string().max(500, 'Bio must be less than 500 characters'),
//     phone_number: Yup.string()
//       .matches(/^[0-9]+$/, "Must be only digits")
//       .min(10, 'Must be at least 10 digits')
//       .max(15, 'Must be less than 15 digits'),
//     profile_picture: Yup.mixed()
//       .test('fileSize', 'File too large (max 5MB)', value => {
//         if (!value) return true; // No file is valid
//         return value.size <= 5 * 1024 * 1024; // 5MB
//       })
//       .test('fileType', 'Unsupported file format', value => {
//         if (!value) return true; // No file is valid
//         return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
//       })
//   });

//   // Formik setup
//   const formik = useFormik({
//     initialValues: {
//       bio: '',
//       phone_number: '',
//       profile_picture: null
//     },
//     validationSchema: profileSchema,
//     enableReinitialize: true,
//     onSubmit: async (values, { setSubmitting }) => {
//       try {
//         const formData = new FormData();
//         formData.append('bio', values.bio);
//         formData.append('phone_number', values.phone_number);
        
//         if (values.profile_picture) {
//           formData.append('profile_picture', values.profile_picture);
//         }

//         await Axiosinstance.put('profile/', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           }
//         });

//         // Refresh data
//         const response = await Axiosinstance.get('profile/');
//         setProfile(response.data);
//         setEditMode(false);
//       } catch (error) {
//         console.error("Failed to update profile:", error.response?.data || error.message);
//       } finally {
//         setSubmitting(false);
//       }
//     }
//   });

//   // Fetch profile data
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await Axiosinstance.get('profile/');
//         setProfile(response.data);
//         formik.setValues({
//           bio: response.data.bio || '',
//           phone_number: response.data.phone_number || '',
//           profile_picture: null
//         });
//       } catch (error) {
//         console.error("Failed to fetch profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, []);

//   // Loading state
//   if (loading) return (
//     <div className="profile-loading">
//       <div className="loading-spinner"></div>
//       <p>Loading your profile...</p>
//     </div>
//   );

//   // Error state
//   if (!profile) return (
//     <div className="profile-error">
//       <h2>Profile Unavailable</h2>
//       <p>We couldn't load your profile data.</p>
//     </div>
//   );

//   return (
//     <div className="profile-container">
//       <div className="profile-header">
//         <div className="profile-avatar">
//           <img
//             src={
//               formik.values.profile_picture 
//                 ? URL.createObjectURL(formik.values.profile_picture)
//                 : profile.profile_picture || '/default-profile.jpg'
//             }
//             alt="Profile"
//             onError={(e) => {
//               e.target.src = '/default-profile.jpg';
//             }}
//           />
//           <h1>{profile.username || profile.email.split('@')[0]}</h1>
//         </div>
        
//         {!editMode && (
//           <button 
//             className="edit-button"
//             onClick={() => setEditMode(true)}
//           >
//             Edit Profile
//           </button>
//         )}
//       </div>

//       {editMode ? (
//         <form onSubmit={formik.handleSubmit} className="edit-form">
//           <div className="form-group">
//             <label htmlFor="bio">Bio</label>
//             <textarea
//               id="bio"
//               name="bio"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.bio}
//               rows={4}
//               className={formik.touched.bio && formik.errors.bio ? 'error' : ''}
//             />
//             {formik.touched.bio && formik.errors.bio && (
//               <div className="error-message">{formik.errors.bio}</div>
//             )}
//           </div>

//           <div className="form-group">
//             <label htmlFor="phone_number">Phone Number</label>
//             <input
//               id="phone_number"
//               name="phone_number"
//               type="text"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.phone_number}
//               className={formik.touched.phone_number && formik.errors.phone_number ? 'error' : ''}
//             />
//             {formik.touched.phone_number && formik.errors.phone_number && (
//               <div className="error-message">{formik.errors.phone_number}</div>
//             )}
//           </div>

//           <div className="form-group">
//             <label htmlFor="profile_picture">Profile Picture</label>
//             <input
//               id="profile_picture"
//               name="profile_picture"
//               type="file"
//               accept="image/*"
//               onChange={(event) => {
//                 formik.setFieldValue(
//                   'profile_picture', 
//                   event.currentTarget.files[0]
//                 );
//               }}
//             />
//             {formik.errors.profile_picture && (
//               <div className="error-message">{formik.errors.profile_picture}</div>
//             )}
//             {formik.values.profile_picture && (
//               <div className="image-preview">
//                 <p>New image preview:</p>
//                 <img 
//                   src={URL.createObjectURL(formik.values.profile_picture)} 
//                   alt="Preview" 
//                 />
//               </div>
//             )}
//           </div>

//           <div className="form-actions">
//             <button 
//               type="submit" 
//               className="save-button"
//               disabled={formik.isSubmitting}
//             >
//               {formik.isSubmitting ? 'Saving...' : 'Save Changes'}
//             </button>
//             <button 
//               type="button"
//               className="cancel-button"
//               onClick={() => {
//                 setEditMode(false);
//                 formik.resetForm();
//               }}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       ) : (
//         <div className="profile-details">
//           <div className="detail-card">
//             <div className="detail-icon">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
//                 <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
//               </svg>
//             </div>
//             <div className="detail-content">
//               <h3>Email</h3>
//               <p>{profile.email}</p>
//             </div>
//           </div>

//           <div className="detail-card">
//             <div className="detail-icon">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//                 <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
//               </svg>
//             </div>
//             <div className="detail-content">
//               <h3>Bio</h3>
//               <p>{profile.bio || 'No bio provided'}</p>
//             </div>
//           </div>

//           {profile.phone_number && (
//             <div className="detail-card">
//               <div className="detail-icon">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//                   <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <div className="detail-content">
//                 <h3>Phone</h3>
//                 <p>{profile.phone_number}</p>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;
// import { useState, useEffect } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import Axiosinstance from "../components/Axiosinstance";
// import './ProfilePage.css';

// const ProfilePage = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editMode, setEditMode] = useState(false);

//   // Validation schema
//   const profileSchema = Yup.object().shape({
//     bio: Yup.string().max(500, 'Bio must be less than 500 characters'),
//     phone_number: Yup.string()
//       .matches(/^[0-9]+$/, "Must be only digits")
//       .min(10, 'Must be at least 10 digits')
//       .max(15, 'Must be less than 15 digits'),
//     profile_picture: Yup.mixed()
//       .test('fileSize', 'File too large (max 5MB)', value => {
//         if (!value) return true;
//         return value.size <= 5 * 1024 * 1024;
//       })
//       .test('fileType', 'Unsupported file format', value => {
//         if (!value) return true;
//         return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
//       })
//   });

//   // Formik setup
//   const formik = useFormik({
//     initialValues: {
//       bio: '',
//       phone_number: '',
//       profile_picture: undefined
//     },
//     validationSchema: profileSchema,
//     enableReinitialize: true,
//     onSubmit: async (values, { setSubmitting }) => {
//       try {
//         const formData = new FormData();
//         formData.append('bio', values.bio);
//         formData.append('phone_number', values.phone_number);

//         if (values.profile_picture) {
//           formData.append('profile_picture', values.profile_picture);
//         }

//         await Axiosinstance.put('profile/', formData, {
//           headers: { 'Content-Type': 'multipart/form-data' }
//         });

//         const response = await Axiosinstance.get('profile/');
//         setProfile(response.data);
//         setEditMode(false);
//       } catch (error) {
//         console.error("Failed to update profile:", error.response?.data || error.message);
//       } finally {
//         setSubmitting(false);
//       }
//     }
//   });

//   // Fetch profile
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await Axiosinstance.get('profile/');
//         setProfile(response.data);
//         formik.setValues({
//           bio: response.data.bio || '',
//           phone_number: response.data.phone_number || '',
//           profile_picture: undefined
//         });
//       } catch (error) {
//         console.error("Failed to fetch profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, []);

//   // Cleanup for object URL
//   useEffect(() => {
//     let objectUrl;
//     if (formik.values.profile_picture) {
//       objectUrl = URL.createObjectURL(formik.values.profile_picture);
//     }

//     return () => {
//       if (objectUrl) URL.revokeObjectURL(objectUrl);
//     };
//   }, [formik.values.profile_picture]);

//   if (loading) return (
//     <div className="profile-loading">
//       <div className="loading-spinner"></div>
//       <p>Loading your profile...</p>
//     </div>
//   );

//   if (!profile) return (
//     <div className="profile-error">
//       <h2>Profile Unavailable</h2>
//       <p>We couldn't load your profile data.</p>
//     </div>
//   );

//   return (
//     <div className="profile-container">
//       <div className="profile-header">
//         <div className="profile-avatar">
//           <img
//             src={
//               formik.values.profile_picture
//                 ? URL.createObjectURL(formik.values.profile_picture)
//                 : profile.profile_picture || '/default-profile.jpg'
//             }
//             alt="Profile"
//             onError={(e) => {
//               e.target.src = '/default-profile.jpg';
//             }}
//           />
//           <h1>{profile.username || profile.email.split('@')[0]}</h1>
//         </div>
        
//         {!editMode && (
//           <button 
//             className="edit-button"
//             onClick={() => setEditMode(true)}
//           >
//             Edit Profile
//           </button>
//         )}
//       </div>

//       {editMode ? (
//         <form onSubmit={formik.handleSubmit} className="edit-form">
//           <div className="form-group">
//             <label htmlFor="bio">Bio</label>
//             <textarea
//               id="bio"
//               name="bio"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.bio}
//               rows={4}
//               className={formik.touched.bio && formik.errors.bio ? 'error' : ''}
//             />
//             {formik.touched.bio && formik.errors.bio && (
//               <div className="error-message">{formik.errors.bio}</div>
//             )}
//           </div>

//           <div className="form-group">
//             <label htmlFor="phone_number">Phone Number</label>
//             <input
//               id="phone_number"
//               name="phone_number"
//               type="text"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.phone_number}
//               className={formik.touched.phone_number && formik.errors.phone_number ? 'error' : ''}
//             />
//             {formik.touched.phone_number && formik.errors.phone_number && (
//               <div className="error-message">{formik.errors.phone_number}</div>
//             )}
//           </div>

//           <div className="form-group">
//             <label htmlFor="profile_picture">Profile Picture</label>
//             <input
//               id="profile_picture"
//               name="profile_picture"
//               type="file"
//               accept="image/*"
//               onChange={(event) => {
//                 formik.setFieldValue('profile_picture', event.currentTarget.files[0]);
//               }}
//             />
//             {formik.errors.profile_picture && (
//               <div className="error-message">{formik.errors.profile_picture}</div>
//             )}
//             {formik.values.profile_picture && (
//               <div className="image-preview">
//                 <p>New image preview:</p>
//                 <img 
//                   src={URL.createObjectURL(formik.values.profile_picture)} 
//                   alt="Preview" 
//                 />
//               </div>
//             )}
//           </div>

//           <div className="form-actions">
//             <button 
//               type="submit" 
//               className="save-button"
//               disabled={formik.isSubmitting}
//             >
//               {formik.isSubmitting ? 'Saving...' : 'Save Changes'}
//             </button>
//             <button 
//               type="button"
//               className="cancel-button"
//               onClick={() => {
//                 setEditMode(false);
//                 formik.resetForm({
//                   values: {
//                     bio: profile.bio || '',
//                     phone_number: profile.phone_number || '',
//                     profile_picture: undefined
//                   }
//                 });
//               }}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       ) : (
//         <div className="profile-details">
//           <div className="detail-card">
//             <div className="detail-icon">
//               {/* Email Icon */}
//             </div>
//             <div className="detail-content">
//               <h3>Email</h3>
//               <p>{profile.email}</p>
//             </div>
//           </div>

//           <div className="detail-card">
//             <div className="detail-icon">
//               {/* Bio Icon */}
//             </div>
//             <div className="detail-content">
//               <h3>Bio</h3>
//               <p>{profile.bio || 'No bio provided'}</p>
//             </div>
//           </div>

//           {profile.phone_number && (
//             <div className="detail-card">
//               <div className="detail-icon">
//                 {/* Phone Icon */}
//               </div>
//               <div className="detail-content">
//                 <h3>Phone</h3>
//                 <p>{profile.phone_number}</p>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;


//kan hoose wuu shaqaynayaa


// import { useState, useEffect } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import Axiosinstance from "../components/Axiosinstance";
// import './ProfilePage.css';

// const ProfilePage = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editMode, setEditMode] = useState(false);

//   const profileSchema = Yup.object().shape({
//     bio: Yup.string().max(500, 'Bio must be less than 500 characters'),
//     phone_number: Yup.string()
//       .matches(/^[0-9]+$/, "Must be only digits")
//       .min(10, 'Must be at least 10 digits')
//       .max(15, 'Must be less than 15 digits'),
//     profile_picture: Yup.mixed()
//       .test('fileSize', 'File too large (max 5MB)', value => {
//         if (!value) return true;
//         return value.size <= 5 * 1024 * 1024;
//       })
//       .test('fileType', 'Unsupported file format', value => {
//         if (!value) return true;
//         return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
//       })
//   });

//   const formik = useFormik({
//     initialValues: {
//       bio: '',
//       phone_number: '',
//       profile_picture: undefined
//     },
//     validationSchema: profileSchema,
//     enableReinitialize: true,
//     onSubmit: async (values, { setSubmitting }) => {
//       try {
//         const formData = new FormData();
//         formData.append('bio', values.bio);
//         formData.append('phone_number', values.phone_number);
//         if (values.profile_picture) {
//           formData.append('profile_picture', values.profile_picture);
//         }

//         await Axiosinstance.put('profile/', formData, {
//           headers: { 'Content-Type': 'multipart/form-data' }
//         });

//         const response = await Axiosinstance.get('profile/');
//         setProfile(response.data);
//         setEditMode(false);
//       } catch (error) {
//         console.error("Failed to update profile:", error.response?.data || error.message);
//       } finally {
//         setSubmitting(false);
//       }
//     }
//   });

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await Axiosinstance.get('profile/');
//         setProfile(response.data);
//         formik.setValues({
//           bio: response.data.bio || '',
//           phone_number: response.data.phone_number || '',
//           profile_picture: undefined
//         });
//       } catch (error) {
//         console.error("Failed to fetch profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, []);

//   useEffect(() => {
//     let objectUrl;
//     if (formik.values.profile_picture) {
//       objectUrl = URL.createObjectURL(formik.values.profile_picture);
//     }
//     return () => {
//       if (objectUrl) URL.revokeObjectURL(objectUrl);
//     };
//   }, [formik.values.profile_picture]);

//   if (loading) return (
//     <div className="profile-loading">
//       <div className="loading-spinner"></div>
//       <p>Loading your profile...</p>
//     </div>
//   );

//   if (!profile) return (
//     <div className="profile-error">
//       <h2>Profile Unavailable</h2>
//       <p>We couldn't load your profile data.</p>
//     </div>
//   );

//   return (
//     <div className="profile-container">
//       <div className="profile-header">
//         <div className="profile-avatar">
//           <img
//             src={
//               formik.values.profile_picture
//                 ? URL.createObjectURL(formik.values.profile_picture)
//                 : profile.profile_picture || '/default-profile.jpg'
//             }
//             alt="Profile"
//             onError={(e) => {
//               e.target.src = '/default-profile.jpg';
//             }}
//           />
//           <h1>{profile.username || profile.email.split('@')[0]}</h1>
//         </div>
        
//         {!editMode && (
//           <button className="edit-button" onClick={() => setEditMode(true)}>
//             Edit Profile
//           </button>
//         )}
//       </div>

//       {editMode ? (
//         <form onSubmit={formik.handleSubmit} className="edit-form">
//           <div className="form-group">
//             <label htmlFor="bio">Bio</label>
//             <textarea
//               id="bio"
//               name="bio"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.bio}
//               rows={4}
//               className={formik.touched.bio && formik.errors.bio ? 'error' : ''}
//             />
//             {formik.touched.bio && formik.errors.bio && (
//               <div className="error-message">{formik.errors.bio}</div>
//             )}
//           </div>

//           <div className="form-group">
//             <label htmlFor="phone_number">Phone Number</label>
//             <input
//               id="phone_number"
//               name="phone_number"
//               type="text"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.phone_number}
//               className={formik.touched.phone_number && formik.errors.phone_number ? 'error' : ''}
//             />
//             {formik.touched.phone_number && formik.errors.phone_number && (
//               <div className="error-message">{formik.errors.phone_number}</div>
//             )}
//           </div>

//           <div className="form-group">
//             <label htmlFor="profile_picture">Profile Picture</label>
//             <input
//               id="profile_picture"
//               name="profile_picture"
//               type="file"
//               accept="image/*"
//               onChange={(event) => {
//                 formik.setFieldValue('profile_picture', event.currentTarget.files[0]);
//               }}
//             />
//             {formik.errors.profile_picture && (
//               <div className="error-message">{formik.errors.profile_picture}</div>
//             )}
//             {formik.values.profile_picture && (
//               <div className="image-preview">
//                 <p>New image preview:</p>
//                 <img 
//                   src={URL.createObjectURL(formik.values.profile_picture)} 
//                   alt="Preview" 
//                 />
//               </div>
//             )}
//           </div>

//           <div className="form-actions">
//             <button type="submit" className="save-button" disabled={formik.isSubmitting}>
//               {formik.isSubmitting ? 'Saving...' : 'Save Changes'}
//             </button>
//             <button
//               type="button"
//               className="cancel-button"
//               onClick={() => {
//                 setEditMode(false);
//                 formik.resetForm({
//                   values: {
//                     bio: profile.bio || '',
//                     phone_number: profile.phone_number || '',
//                     profile_picture: undefined
//                   }
//                 });
//               }}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       ) : (
//         <div className="profile-details">
//           <div className="detail-card">
//             <div className="detail-icon">
//               {/* Email Icon */}
//               <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M1.5 6.75A3.75 3.75 0 015.25 3h13.5A3.75 3.75 0 0122.5 6.75v10.5A3.75 3.75 0 0118.75 21H5.25A3.75 3.75 0 011.5 17.25V6.75zm2.578-.78A1.25 1.25 0 005.25 5.25h13.5a1.25 1.25 0 011.172.72L12 12.3 4.078 5.97zM3 7.612v9.638a1.25 1.25 0 001.25 1.25h15.5a1.25 1.25 0 001.25-1.25V7.612l-8.586 6.014a1.25 1.25 0 01-1.428 0L3 7.612z" />
//               </svg>
//             </div>
//             <div className="detail-content">
//               <h3>Email</h3>
//               <p>{profile.email}</p>
//             </div>
//           </div>

//           <div className="detail-card">
//             <div className="detail-icon">
//               {/* Bio Icon */}
//               <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
//                 <path fillRule="evenodd" d="M3.75 4.5a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75zm0 4.5A.75.75 0 014.5 8.25h8.25a.75.75 0 010 1.5H4.5a.75.75 0 01-.75-.75zm0 4.5a.75.75 0 01.75-.75h13.5a.75.75 0 010 1.5H4.5a.75.75 0 01-.75-.75zm0 4.5A.75.75 0 014.5 17.25h8.25a.75.75 0 010 1.5H4.5a.75.75 0 01-.75-.75z" clipRule="evenodd" />
//               </svg>
//             </div>
//             <div className="detail-content">
//               <h3>Bio</h3>
//               <p>{profile.bio || 'No bio provided'}</p>
//             </div>
//           </div>

//           {profile.phone_number && (
//             <div className="detail-card">
//               <div className="detail-icon">
//                 {/* Phone Icon */}
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
//                   <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <div className="detail-content">
//                 <h3>Phone</h3>
//                 <p>{profile.phone_number}</p>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Axiosinstance from "../components/Axiosinstance";
import './ProfilePage.css';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const profileSchema = Yup.object().shape({
    bio: Yup.string().max(500, 'Bio must be less than 500 characters'),
    phone_number: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, 'Must be at least 10 digits')
      .max(15, 'Must be less than 15 digits'),
    profile_picture: Yup.mixed()
      .test('fileSize', 'File too large (max 5MB)', value => {
        if (!value) return true;
        return value.size <= 5 * 1024 * 1024;
      })
      .test('fileType', 'Unsupported file format', value => {
        if (!value) return true;
        return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
      })
  });

  const formik = useFormik({
    initialValues: {
      bio: '',
      phone_number: '',
      profile_picture: undefined
    },
    validationSchema: profileSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        formData.append('bio', values.bio);
        formData.append('phone_number', values.phone_number);
        if (values.profile_picture) {
          formData.append('profile_picture', values.profile_picture);
        }

        await Axiosinstance.put('profile/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        const response = await Axiosinstance.get('profile/');
        setProfile(response.data);
        setEditMode(false);
      } catch (error) {
        console.error("Failed to update profile:", error.response?.data || error.message);
      } finally {
        setSubmitting(false);
      }
    }
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await Axiosinstance.get('profile/');
        setProfile(response.data);
        formik.setValues({
          bio: response.data.bio || '',
          phone_number: response.data.phone_number || '',
          profile_picture: undefined
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const getProfileImageSrc = () => {
    if (formik.values.profile_picture) {
      return URL.createObjectURL(formik.values.profile_picture);
    }
    if (profile?.profile_picture) {
      return profile.profile_picture;
    }
    return '/default-profile.jpg';
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-error">
        <h2>Profile Unavailable</h2>
        <p>We couldn't load your profile data.</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <img
            src={getProfileImageSrc()}
            alt="Profile"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/default-profile.jpg';
            }}
          />
          <h1>{profile.username || profile.email.split('@')[0]}</h1>
        </div>

        {!editMode && (
          <button className="edit-button" onClick={() => setEditMode(true)}>
            Edit Profile
          </button>
        )}
      </div>

      {editMode ? (
        <form onSubmit={formik.handleSubmit} className="edit-form">
          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bio}
              rows={4}
              className={formik.touched.bio && formik.errors.bio ? 'error' : ''}
            />
            {formik.touched.bio && formik.errors.bio && (
              <div className="error-message">{formik.errors.bio}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone_number">Phone Number</label>
            <input
              id="phone_number"
              name="phone_number"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone_number}
              className={formik.touched.phone_number && formik.errors.phone_number ? 'error' : ''}
            />
            {formik.touched.phone_number && formik.errors.phone_number && (
              <div className="error-message">{formik.errors.phone_number}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="profile_picture">Profile Picture</label>
            <input
              id="profile_picture"
              name="profile_picture"
              type="file"
              accept="image/*"
              onChange={(event) => {
                formik.setFieldValue('profile_picture', event.currentTarget.files[0]);
              }}
            />
            {formik.errors.profile_picture && (
              <div className="error-message">{formik.errors.profile_picture}</div>
            )}
            {formik.values.profile_picture && (
              <div className="image-preview">
                <p>New image preview:</p>
                <img src={URL.createObjectURL(formik.values.profile_picture)} alt="Preview" />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="save-button" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => {
                setEditMode(false);
                formik.resetForm({
                  values: {
                    bio: profile.bio || '',
                    phone_number: profile.phone_number || '',
                    profile_picture: undefined
                  }
                });
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-details">
          <div className="detail-card">
            <div className="detail-icon">
              📧
            </div>
            <div className="detail-content">
              <h3>Email</h3>
              <p>{profile.email}</p>
            </div>
          </div>

          <div className="detail-card">
            <div className="detail-icon">
              📝
            </div>
            <div className="detail-content">
              <h3>Bio</h3>
              <p>{profile.bio || 'No bio provided'}</p>
            </div>
          </div>

          {profile.phone_number && (
            <div className="detail-card">
              <div className="detail-icon">
                📞
              </div>
              <div className="detail-content">
                <h3>Phone</h3>
                <p>{profile.phone_number}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
