import Axios from 'axios';

const Axiosinstance = Axios.create({
    baseURL:'http://127.0.0.1:8000/api/auth/',
    timeout:15000,
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
    }
})

// Add a request interceptor to include Authorization header if token exists
Axiosinstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('Token')
        if (token) {
            config.headers.Authorization = `Token ${token}`
        } else {
            config.headers.Authorization = ` `
        }
        return config
    }
);

// Add a response interceptor to handle token expiration
// Axiosinstance.interceptors.response.use(
//     (response) => {
//         return response;

//     },
//     (error) => {
//          if (error.response && error.response.status === 401){
//             localStorage.removeItem('Token');
//             window.location.href = '/login';
//          }
         
//     }
 
// );

Axiosinstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Don't handle 401 if it's a login request
        if (error.config.url.includes('/login/')) {
            return Promise.reject(error);
        }
        
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('Token');
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default Axiosinstance;