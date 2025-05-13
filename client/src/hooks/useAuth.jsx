import { useState, useContext } from 'react';
import axiosInstance from '../utils/axiosInstance';  // Ensure this is set up correctly
import { AuthContext } from '../components/AuthContext';
import { toast } from 'react-toastify';

// Custom hook to use authentication context
export const useAuth = () => {
  const { user, setUser, hydrated } = useContext(AuthContext);  // Access the AuthContext
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Login function to handle authentication
  const login = async (email, password) => {
    setLoading(true);
    setError(''); // Reset previous errors

    try {
      const response = await axiosInstance.post('/api/auth/login', {
        email,
        password,
      });

      if (response.status === 200 && response.data.success) {
        const { token, user: userInfo } = response.data;

        const loggedInUser = {
          email: userInfo.email,
          role: userInfo.role,
          token,
          _id: userInfo._id,
        };

        setUser(loggedInUser);
        localStorage.setItem('ruthenix_user', JSON.stringify(loggedInUser));
        localStorage.setItem('token', token);

        toast.success('Login successful!');
        return { success: true, message: 'Login successful!' };
      } else {
        const errorMessage = response.data.message || 'Login failed.';
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, message: errorMessage };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed.';
      console.error('Login Error:', errorMessage);
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('ruthenix_user');
    localStorage.removeItem('token');
    toast.success('Logged out successfully!');
  };

  // Check if user is authenticated
  const isAuthenticated = !!user;

  // Optionally handle context hydration if you want to ensure it's ready
  if (!hydrated) {
    return { loading: true, isAuthenticated: false };
  }

  return { user, login, logout, loading, error, isAuthenticated };
};
