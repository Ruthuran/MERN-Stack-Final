import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BookOpenCheck, PencilLine } from "lucide-react";

const API_URL = `${import.meta.env.VITE_SERVER_URL || "http://localhost:5000"}/api/admin`;
const COURSES_API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/courses`;

const AddMentorForm = () => {
  const [mentorData, setMentorData] = useState({
    name: "",
    email: "",
    password: "",
    course: "",
  });
  const [mentors, setMentors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [editingMentor, setEditingMentor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await axios.get(`${API_URL}/get-mentors`);
        setMentors(res.data);
      } catch {
        toast.error("Failed to load mentors");
      }
    };
  
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
        toast.error("Error fetching courses");
      } finally {
        setLoadingCourses(false);  // Set loadingCourses to false after fetching is done
      }
    };
  
    fetchMentors();
    fetchCourses();
  }, []);
  
  const handleChange = (e) => {
    setMentorData({ ...mentorData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mentorData.name || !mentorData.email || (!editingMentor && !mentorData.password)) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const payload = { ...mentorData };
      if (editingMentor) {
        const res = await axios.put(`${API_URL}/edit-mentor/${editingMentor._id}`, payload);
        setMentors((prev) =>
          prev.map((m) => (m._id === editingMentor._id ? res.data : m))
        );
        toast.success("Mentor updated");
      } else {
        const res = await axios.post(`${API_URL}/add-mentor`, payload);
        setMentors((prev) => [...prev, res.data]);
        toast.success("Mentor added");
      }
      setMentorData({ name: "", email: "", password: "", course: "" });
      setEditingMentor(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save mentor");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (mentor) => {
    setEditingMentor(mentor);
    setMentorData({
      name: mentor.name,
      email: mentor.email,
      password: "",
      course: mentor.course || "",
    });
  };

  const handleCancel = () => {
    setEditingMentor(null);
    setMentorData({ name: "", email: "", password: "", course: "" });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Top Section */}
      <div className="bg-white border rounded-3xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-indigo-700 flex items-center gap-2 mb-6">
          <BookOpenCheck className="w-6 h-6" />
          {editingMentor ? "Edit Mentor" : "Add New Mentor"}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={mentorData.name}
            onChange={handleChange}
            className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={mentorData.email}
            onChange={handleChange}
            className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500"
            required
          />
          {!editingMentor && (
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={mentorData.password}
              onChange={handleChange}
              className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500"
              required
            />
          )}
         <select
  name="course"
  value={mentorData.course || ""}
  onChange={handleChange}
  className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500"
>
  <option value="">Assign Course</option>
  {loadingCourses ? (
    <option disabled>Loading courses...</option>
  ) : courses.length > 0 ? (
    courses.map((course) => (
      <option key={course._id} value={course._id}>
        {course.title || course.name || "Untitled Course"}
      </option>
    ))
  ) : (
    <option disabled>No courses available</option>
  )}
  {/* Default "None" option */}
  {mentorData.course === "" && (
    <option value="" disabled selected>
      None
    </option>
  )}
</select>

          <div className="md:col-span-2 flex gap-4 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition"
            >
              {loading ? "Saving..." : editingMentor ? "Update Mentor" : "Add Mentor"}
            </button>
            {editingMentor && (
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-300 px-6 py-2 rounded-xl hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Bottom Section */}
      <div className="bg-white border rounded-3xl shadow-lg p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Mentor List</h3>
        {mentors.length === 0 ? (
          <p className="text-gray-500">No mentors found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map((mentor) => (
              <div key={mentor._id} className="border border-gray-200 rounded-xl p-4 shadow-sm bg-gradient-to-tr from-gray-50 to-white">
                <h4 className="text-lg font-bold text-indigo-800">{mentor.name}</h4>
                <p className="text-sm text-gray-600">{mentor.email}</p>
                <p className="text-sm mt-1 text-gray-500">
                  Assigned Course:{" "}
                  <span className="font-medium text-gray-800">
                    {mentor.course || "None"}  {/* Will display the course name if populated */}
                  </span>
                </p>



                <div className="mt-3 flex gap-4">
                  <button
                    onClick={() => handleEdit(mentor)}
                    className="text-indigo-600 hover:underline text-sm flex items-center gap-1"
                  >
                    <PencilLine className="w-4 h-4" /> Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddMentorForm;
