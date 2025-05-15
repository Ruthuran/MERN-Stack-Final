import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Course images
import course1 from '../assets/course1.jpg';
import course2 from '../assets/course2.jpg';
import course3 from '../assets/course3.jpg';
import course4 from '../assets/course4.png';
import course5 from '../assets/course5.jpg';
import course6 from '../assets/course6.jpg';
import course7 from '../assets/course7.jpg';
import course8 from '../assets/course8.jpg';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Map course names to images
  const courseImages = {
    "🌐 Web Development Bootcamp": course1,
    "📊 Data Science Masterclass": course2,
    "🎨 UI/UX Design Essentials": course3,
    "📈 Stock Marketing Fundamentals": course4,
    "📢 Digital Marketing Pro": course5,
    "📚 Business Accounting Basics": course6,
    "🔍 Software Testing Foundations": course7,
    "📊 Data Analytics with Excel & Power BI": course8,
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
       const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/courses`);
        setCourses(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching courses.");
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Extract unique categories from the courses list
  const uniqueCategories = ["All", ...new Set(courses.map(course => course.category))];

  // Filter courses based on selected category and publication status
  const filteredCourses =
    selectedCategory === "All"
      ? courses.filter((course) => course.isPublished)
      : courses.filter(
          (course) => course.category === selectedCategory && course.isPublished
        );

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) stars.push("★");
    if (halfStar) stars.push("☆");

    return stars.join("");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="px-6 py-10 bg-white dark:bg-gray-900 dark:text-white w-full min-h-screen">
      {/* Top section with Assignments button */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-base"
        >
          <span className="text-xl mr-2">←</span> Back
        </button>

        {/* Assignments button */}
        <Link
          to="/assignments"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          📝 Assignments
        </Link>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
        Explore Courses
      </h2>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {uniqueCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border transition font-medium text-sm ${
              selectedCategory === cat
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course._id}
            className="relative bg-white dark:bg-gray-800 border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 overflow-hidden"
          >
            {course.badge && (
              <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded">
                {course.badge}
              </span>
            )}

            <img
              src={courseImages[course.name] || "https://via.placeholder.com/400x250"}
              alt={course.name}
              className="w-full h-44 object-cover"
              loading="lazy"
              width="400"
              height="250"
            />

            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">{course.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">By {course.instructor}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Brand: {course.brand}</p>

              <div className="flex items-center text-yellow-500 text-sm mb-2">
                <span>{renderStars(course.rating)}</span>
                <span className="ml-1 text-gray-600 text-xs dark:text-gray-300">
                  ({course.rating.toFixed(1)})
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-green-600 font-bold text-lg">{course.discountedPrice}</span>
                <span className="text-gray-400 line-through text-sm dark:text-gray-500">
                  {course.originalPrice}
                </span>
              </div>

              <Link
                to={`/courses/${course._id}`}
                state={{ course }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition block text-center"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
