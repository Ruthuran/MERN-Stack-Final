import axios from 'axios';
import jwt_decode from 'jwt-decode';

const axiosInstance = axios.create({
  baseURL: 'https://mern-stack-final-server.onrender.com',  // Fixed backend URL
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Attach token if available and valid
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        const tokenExpiry = decodedToken.exp * 1000; // to ms
        if (tokenExpiry > Date.now()) {
          config.headers['Authorization'] = `Bearer ${token}`;
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('ruthenix_user');
          window.location.href = '/login';
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('ruthenix_user');
        window.location.href = '/login';
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global response error handlng
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        console.error('Unauthorized access. Please log in again.');
        localStorage.removeItem('token');
        localStorage.removeItem('ruthenix_user');
        window.location.href = '/login';
      } else if (status === 500) {
        console.error('Internal Server Error. Please try again later.');
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
