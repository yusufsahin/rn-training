import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://192.168.1.6:3000',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    }, 
});
axiosInstance.interceptors.request.use(
    (config) => {
        console.log('Request was sent:', config);
        return config;
    },
    (error) => {
        console.log('Request error:', error);
        return Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use(
    (response) => {
        console.log('Response was received:', response);
        return response;
    },
    (error) => {
        console.log('Response error:', error);
        return Promise.reject(error);
    }
);  

export default axiosInstance;
