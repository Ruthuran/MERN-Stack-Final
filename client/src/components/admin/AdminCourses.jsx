import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { FaEdit, FaStar, FaRegStar } from 'react-icons/fa';

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    instructor: '',
    description: '',
    rating: '',
    originalPrice: '',
    discountedPrice: '',
    badge: '',
    isPublished: true
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/courses');
      setCourses(res.data);
    } catch (err) {
      console.error('Error fetching courses:', err);
      toast.error('Error fetching courses');
    }
  };

  const handleEditClick = (course) => {
    setEditingCourse(course);
    setFormData(course);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/courses/${editingCourse._id}`, formData);
      toast.success('Course updated successfully');
      setEditingCourse(null);
      fetchCourses();
    } catch (err) {
      console.error('Update failed:', err);
      toast.error('Failed to update course');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Toaster />
      <h2 className="text-3xl font-bold mb-6 text-gray-800">All Courses</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map(course => (
          <div
            key={course._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-5 relative group"
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-1">{course.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{course.instructor}</p>
            <p className="text-gray-700 mb-2 line-clamp-3">{course.description}</p>
            <div className="flex items-center mb-2">
              {Array.from({ length: 5 }, (_, index) => (
                <span key={index} className="text-yellow-500">
                  {index < course.rating ? <FaStar /> : <FaRegStar />}
                </span>
              ))}
            </div>
            <p className="line-through text-red-400 text-sm">{course.originalPrice}</p>
            <p className="text-green-600 font-bold text-lg">{course.discountedPrice}</p>
            {course.badge && (
              <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {course.badge}
              </span>
            )}
            <button
              onClick={() => handleEditClick(course)}
              className="absolute top-4 right-4 text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded hover:bg-indigo-200 transition"
            >
              <FaEdit /> Edit
            </button>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg animate__animated animate__fadeIn animate__faster">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Edit Course</h3>
            <div className="space-y-3">
              {['name', 'instructor', 'description', 'rating', 'originalPrice', 'discountedPrice', 'badge'].map(field => (
                <input
                  key={field}
                  name={field}
                  value={formData[field] || ''}
                  onChange={handleInputChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              ))}

              {/* isPublished Checkbox */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <label className="text-sm text-gray-700">Published</label>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setEditingCourse(null)}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCourses;
