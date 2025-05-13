import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from './axiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isAuthenticated = !!user;
  const role = user?.role || '';

  // Validate token and load user from localStorage
  const validateTokenAndSetUser = () => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('ruthenix_user');

    if (token && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        const decodedToken = JSON.parse(atob(token.split('.')[1] || ''));
        const tokenExpiry = decodedToken.exp * 1000;

        if (tokenExpiry > Date.now()) {
          setUser(parsedUser);
        } else {
          localStorage.removeItem('ruthenix_user');
          localStorage.removeItem('token');
          toast.error("Session expired, please log in again.");
        }
      } catch (err) {
        console.error("Token validation failed:", err);
        localStorage.removeItem('ruthenix_user');
        localStorage.removeItem('token');
      }
    }
  };

  useEffect(() => {
    validateTokenAndSetUser();
    setHydrated(true);
  }, []);

  const signup = async (email, password, role) => {
    setLoading(true);
    setError('');

    try {
      const response = await axiosInstance.post('/api/auth/signup', { email, password, role });

      const { token, user: userInfo } = response.data || {};
      if (response.status === 201 && response.data.success) {
        const newUser = {
          email: userInfo?.email || '',
          role: userInfo?.role || '',
          token,
          _id: userInfo?._id || '',
        };

        setUser(newUser);
        localStorage.setItem('ruthenix_user', JSON.stringify(newUser));
        localStorage.setItem('token', token);
        toast.success('Signup successful!');
        return { success: true, message: 'Signup successful!' };
      } else {
        const msg = response.data.message || 'Signup failed.';
        toast.error(msg);
        return { success: false, message: msg };
      }
    } catch (err) {
      const msg = err?.response?.data?.message || 'Signup failed.';
      console.error('Signup Error:', err);
      toast.error(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError('');

    try {
      const response = await axiosInstance.post('/api/auth/login', { email, password });

      const { token, user: userInfo } = response.data || {};
      if (response.status === 200 && response.data.success) {
        const loggedInUser = {
          email: userInfo?.email || '',
          role: userInfo?.role || '',
          token,
          _id: userInfo?._id || '',
        };

        setUser(loggedInUser);
        localStorage.setItem('ruthenix_user', JSON.stringify(loggedInUser));
        localStorage.setItem('token', token);

        if (userInfo?.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (userInfo?.role === 'mentor') {
          navigate('/mentor/dashboard');
        } else {
          navigate('/dashboard');
        }

        toast.success('Login successful!');
        return { success: true, message: 'Login successful!' };
      } else {
        const msg = response.data.message || 'Login failed.';
        setError(msg);
        toast.error(msg);
        return { success: false, message: msg };
      }
    } catch (err) {
      const msg = err?.response?.data?.message || 'Login failed.';
      console.error('Login Error:', err);
      setError(msg);
      toast.error(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ruthenix_user');
    localStorage.removeItem('token');
    navigate('/login');
    toast.success('Logged out successfully!');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signup,
        login,
        logout,
        loading,
        error,
        isAuthenticated,
        role,
        hydrated,
      }}
    >
      {hydrated ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
