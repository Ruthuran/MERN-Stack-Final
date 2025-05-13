import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/courses")
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching courses. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <svg
          className="animate-spin h-10 w-10 text-indigo-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6a2 2 0 011.416-.618A7.004 7.004 0 0112 4a7.004 7.004 0 016.584 3.382A2 2 0 1120 6"
          />
        </svg>
        <span className="sr-only">Loading courses...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 text-red-800 px-6 py-4 rounded-md shadow-md">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Explore Courses</h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {courses.map((course) => (
          <motion.div
            key={course._id}
            whileHover={{ scale: 1.03 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden cursor-pointer transition"
            onClick={() => navigate(`/course/${course._id}`)}
            aria-label={`Go to course details for ${course.title}`}
          >
            <img
              loading="lazy"
              src={course.image || "/images/placeholder.jpg"}
              alt={course.title || "Course image"}
              className="w-full h-40 object-cover rounded-t-2xl"
              onError={(e) => (e.target.src = "/images/placeholder.jpg")}
              aria-label={`Image for ${course.title}`}
            />
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {course.title || "Untitled Course"}
                </h3>
                <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {course.level || "Beginner"}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {course.description || "No description provided."}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Instructor: {course.instructor || "Unknown"}
              </p>
              <div className="flex items-center justify-between text-xs mt-2">
                <span className="text-yellow-500 font-medium">
                  ⭐ {course.rating || "N/A"}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  {course.duration || "N/A"}
                </span>
              </div>
              {course.badge && (
                <span className="inline-block mt-1 bg-yellow-400 text-black text-xs px-2 py-0.5 rounded-full">
                  {course.badge}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
