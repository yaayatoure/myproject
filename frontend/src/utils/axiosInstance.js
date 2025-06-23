// import axios from 'axios';

// // Create a single Axios instance
// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:8000/api/',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add token to every request automatically
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const tokens = JSON.parse(localStorage.getItem('authTokens'));
//     const access = tokens?.access;
//     if (access) {
//       config.headers['Authorization'] = `Bearer ${access}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default axiosInstance;
// src/utils/axiosInstance.js
// import axios from 'axios';
// import jwt_decode from 'jwt-decode';

// // Base URL of your Django backend API
// const baseURL = 'http://localhost:8000/api/';

// // Create an Axios instance
// const axiosInstance = axios.create({
//   baseURL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add interceptor to refresh access token if expired
// axiosInstance.interceptors.request.use(
//   async (config) => {
//     const tokens = JSON.parse(localStorage.getItem('authTokens'));

//     if (tokens) {
//       const decoded = jwt_decode(tokens.access);
//       const isExpired = decoded.exp * 1000 < Date.now();

//       if (isExpired) {
//         try {
//           const response = await axios.post(`${baseURL}token/refresh/`, {
//             refresh: tokens.refresh,
//           });

//           const newTokens = {
//             access: response.data.access,
//             refresh: tokens.refresh,
//           };

//           localStorage.setItem('authTokens', JSON.stringify(newTokens));
//           config.headers['Authorization'] = `Bearer ${newTokens.access}`;
//         } catch (error) {
//           console.error('Token refresh failed:', error);
//           localStorage.removeItem('authTokens');
//           window.location.href = '/login'; // force re-login
//         }
//       } else {
//         config.headers['Authorization'] = `Bearer ${tokens.access}`;
//       }
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default axiosInstance;
//this was my last

// import axios from "axios";
// import jwt_decode from "jwt-decode";
// import dayjs from "dayjs";
// import { useContext } from "react";
// import AuthContext from "../context/AuthContext";

// const baseURL = "http://127.0.0.1:8000/api";

// const useAxios = () => {
//   const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

//   const axiosInstance = axios.create({
//     baseURL,
//     headers: { Authorization: `Bearer ${authTokens?.access}` }
//   });

//   axiosInstance.interceptors.request.use(async req => {
//     const user = jwt_decode(authTokens.access);
//     const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

//     if (!isExpired) return req;

//     const response =  await axios.post(`${baseURL}/token/refresh/`,{
//       refresh: authTokens.refresh
//     });
//     localStorage.setItem("authTokens", JSON.stringify(response.data));
//     localStorage.setItem("authTokens", JSON.stringify(response.data));

//     setAuthTokens(response.data);
//     setUser(jwt_decode(response.data.access));

//     req.headers.Authorization = `Bearer ${response.data.access}`;
//     return req;
//   });

//   return axiosInstance;
// };

// export default useAxios;
import axios from "axios";
// import jwt_decode from "jwt-decode";
import { jwtDecode } from 'jwt-decode';
// import { decodeJwt } from "jwt-decode";
// import * as jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const baseURL = "http://127.0.0.1:8000/api/";  // Added trailing slash

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL,
    headers: { 
      "Content-Type": "application/json",
      Authorization: authTokens?.access ? `Bearer ${authTokens.access}` : undefined
    }
  });

  axiosInstance.interceptors.request.use(async req => {
    // Get tokens from localStorage as fallback
    const storedTokens = JSON.parse(localStorage.getItem('authTokens'));
    const tokens = authTokens || storedTokens;
    
    if (!tokens?.access) {
      // Handle missing tokens (redirect to login)
      window.location.href = '/login';
      return req;
    }

    try {
      const user = jwtDecode(tokens.access);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

      if (!isExpired) {
        req.headers.Authorization = `Bearer ${tokens.access}`;
        return req;
      }

      // Token is expired, try to refresh
      const response = await axios.post(`${baseURL}token/refresh/`, {  // Removed extra slash
        refresh: tokens.refresh
      });

      const newTokens = {
        access: response.data.access,
        refresh: tokens.refresh
      };

      // Update tokens in storage and context
      localStorage.setItem("authTokens", JSON.stringify(newTokens));
      setAuthTokens(newTokens);
      setUser(jwtDecode(response.data.access));

      // Update the request header
      req.headers.Authorization = `Bearer ${response.data.access}`;
    } catch (error) {
      console.error("Token refresh failed:", error);
      // Clear tokens and redirect to login on failure
      localStorage.removeItem("authTokens");
      setAuthTokens(null);
      setUser(null);
      window.location.href = '/login';
    }

    return req;
  });

  return axiosInstance;
};

export default useAxios;