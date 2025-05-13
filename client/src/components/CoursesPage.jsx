import React from "react";

const CoursesPage = ({ courses }) => {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
       
      {courses.map((course) => (
        <div
          key={course.id}
          className="p-4 bg-white shadow-lg rounded-lg transition-all hover:scale-105 hover:shadow-2xl"
        >
          {/* Display the course image with fallback */}
          <img
            src={course.image || "https://via.placeholder.com/400x250"}
            alt={course.name}
            className="w-full h-48 object-cover rounded-t-lg"
            onError={(e) => e.target.src = "https://via.placeholder.com/400x250"}
          />
          <h4 className="text-lg font-semibold mt-2">{course.name}</h4>
          <p className="text-sm text-gray-600 mt-1">{course.description}</p>

          {/* Display the price */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xl font-bold text-green-600">
              {course.discountedPrice}
            </span>
            <span className="text-sm line-through text-gray-400">
              {course.originalPrice}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center mt-2">
            <span className="text-yellow-500">
              {/* Render stars based on rating */}
              {"★".repeat(Math.floor(course.rating))}
              {course.rating % 1 >= 0.5 && "☆"}
            </span>
            <span className="text-xs text-gray-500 ml-2">({course.rating.toFixed(1)})</span>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default CoursesPage;
