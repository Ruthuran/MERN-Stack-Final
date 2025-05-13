import axios from 'axios';



const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',  // Default to localhost if no VITE_API_URL
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Optional timeout
});

// Attach token if available (don’t crash the login page if the token is invalid or expired)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwt_decode(token);  // Using the 'decode' function from jwt-decode
        const tokenExpiry = decodedToken.exp * 1000;  // Convert to milliseconds
        if (tokenExpiry > Date.now()) {
          config.headers['Authorization'] = `Bearer ${token}`;  // Attach token to header if valid
        } else {
          // Token expired
          localStorage.removeItem('token');
          localStorage.removeItem('ruthenix_user');
          // Optionally trigger logout or redirect to login
          window.location.href = '/login'; // or use your routing system
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('ruthenix_user');
        window.location.href = '/login';  // Redirect to login if the token is invalid
      }
    }
    return config;
  },
  (error) => Promise.reject(error)  // Handle request error
);

// Global response error handler
axiosInstance.interceptors.response.use(
  (response) => response,  // Return the response as is
  (error) => {
    if (error.response) {
      const { status } = error.response;
      
      // Handle unauthorized access (401)
      if (status === 401) {
        console.error('Unauthorized access. Please log in again.');
        localStorage.removeItem('token');
        localStorage.removeItem('ruthenix_user');
        window.location.href = '/login';  // Redirect to login
      }
      // Handle server errors (500)
      else if (status === 500) {
        console.error('Internal Server Error. Please try again later.');
      }
    }
    return Promise.reject(error);  // Return rejected error
  }
);

export default axiosInstance;
