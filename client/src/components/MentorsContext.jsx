import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Create context for mentors
export const MentorsContext = createContext();

// Mentors provider component
export const MentorsProvider = ({ children }) => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Auth-specific state
  const [mentorToken, setMentorToken] = useState(localStorage.getItem('mentorToken') || '');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch mentors (e.g., for admin view or public list)
  const fetchMentors = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/mentors?page=${page}`);
      if (!response.ok) {
        throw new Error('Failed to fetch mentors');
      }
      const data = await response.json();
      setMentors(data.mentors || []);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.currentPage || 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMentors(currentPage);
  }, [fetchMentors, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // 🟢 Mentor Login Function
  const loginMentor = async ({ email, password }) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/mentor/login`, { email, password });

      if (data.success) {
        localStorage.setItem('mentorToken', data.token);
        setMentorToken(data.token);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Login failed' };
    }
  };

  // 🔴 Mentor Logout Function
  const logoutMentor = () => {
    localStorage.removeItem('mentorToken');
    setMentorToken('');
  };

  return (
    <MentorsContext.Provider
      value={{
        mentors,
        loading,
        error,
        currentPage,
        totalPages,
        handlePageChange,
        mentorToken,
        loginMentor,
        logoutMentor,
      }}
    >
      {children}
    </MentorsContext.Provider>
  );
};
