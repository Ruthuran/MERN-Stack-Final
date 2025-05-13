import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();  // Replacing useHistory with useNavigate
  const [query, setQuery] = useState('');
  const [courses, setCourses] = useState([]); // This will store your search results
  const [loading, setLoading] = useState(false); // Loading state for async fetching

  // When the location (URL) changes, extract the query parameter and update state
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query');
    setQuery(query || ''); // Set the query to empty if not found
    if (query) {
      fetchCourses(query);
    }
  }, [location.search]); // Re-run when search query changes

  // Simulate fetching courses (you can replace this with an API call)
  const fetchCourses = (query) => {
    setLoading(true); // Start loading
    const allCourses = [
      { title: 'Web Development' },
      { title: 'Data Science' },
      { title: 'UI/UX Design' },
      { title: 'Stock Marketing' },
      { title: 'Digital Marketing' },
      { title: 'Business Accounting' },
      { title: 'Software Testing' },
      { title: 'Data Analytics' },
    ];
    // Filter courses based on query
    const filteredCourses = allCourses.filter(course =>
      course.title.toLowerCase().includes(query.toLowerCase())
    );
    setTimeout(() => { // Simulate network delay
      setCourses(filteredCourses);
      setLoading(false); // Stop loading after fetching
    }, 500);
  };

  // Handle back to search page
  const handleBackToSearch = () => {
    navigate('/search');  // Replace history.push with navigate
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Search Results for: "{query}"</h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin h-8 w-8 border-4 border-blue-500 border-solid rounded-full"></div>
        </div>
      ) : query === '' ? (
        <p className="text-center text-gray-500">Please enter a search query to view results.</p>
      ) : courses.length > 0 ? (
        <ul className="space-y-4">
          {courses.map((course, index) => (
            <li key={index} className="bg-white p-4 rounded-md shadow-md hover:bg-blue-50">
              <h3 className="text-xl font-semibold text-gray-700">{course.title}</h3>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No courses found for "{query}".</p>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={handleBackToSearch}
          className="text-blue-500 hover:text-blue-700 font-medium text-sm"
        >
          Back to Search
        </button>
      </div>
    </div>
  );
};

export default SearchResults;
