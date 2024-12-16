import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
    baseURL: 'http://192.168.1.4:3000',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    }, 
});
axiosInstance.interceptors.request.use(
    async (config) => {
       

        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }   
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
/*
        if (error.response?.status === 401) {
            // Optionally, clear the token and redirect to login
            AsyncStorage.removeItem('token');
            console.warn('Unauthorized - logging out');
          }
*/
        return Promise.reject(error);
    }
);  

export default axiosInstance;
