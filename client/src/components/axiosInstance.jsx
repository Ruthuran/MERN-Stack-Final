import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://mern-stack-final-server.onrender.com',  
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwt_decode(token);  
        const tokenExpiry = decodedToken.exp * 1000;  
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
      }
      
      else if (status === 500) {
        console.error('Internal Server Error. Please try again later.');
      }
    }
    return Promise.reject(error);  
  }
);

export default axiosInstance;
