import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [totalEnrollments, setTotalEnrollments] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState("");  

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/students");
        setStudents(res.data);
      } catch (error) {
        setError("Error fetching students.");
      }
    };

    const fetchEnrollments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/enrollments");
        setEnrollments(res.data.enrollments);
        setTotalEnrollments(res.data.totalEnrollments);
        setTotalEarnings(res.data.totalEarnings);
      } catch (error) {
        setError("Error fetching enrollments.");
      }
    };

    const fetchData = async () => {
      await fetchStudents();
      await fetchEnrollments();
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-10 px-4 py-8 bg-gradient-to-r from-indigo-50 to-blue-100 min-h-screen">
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-xl p-8 hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
          <h3 className="text-xl font-bold text-gray-700 mb-2">👨‍🎓 Total Students</h3>
          <p className="text-4xl font-semibold text-indigo-600">{students.length}</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-8 hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
          <h3 className="text-xl font-bold text-gray-700 mb-2">📝 Total Enrollments</h3>
          <p className="text-4xl font-semibold text-green-600">{totalEnrollments}</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-8 hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
          <h3 className="text-xl font-bold text-gray-700 mb-2">💰 Total Earnings</h3>
          <p className="text-4xl font-semibold text-yellow-600">₹ {totalEarnings}</p>
        </div>
      </div>

      {/* All Students Table */}
      <div className="bg-white shadow-lg rounded-xl p-8 mt-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">All Students</h2>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <svg
              className="animate-spin h-12 w-12 text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="4"></circle>
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
                d="M4 12a8 8 0 0116 0"
              ></path>
            </svg>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : students.length === 0 ? (
          <p className="text-gray-500 text-center">No students found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 rounded-lg border border-gray-200">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student._id} className="hover:bg-indigo-50 transition-colors duration-200">
                    <td className="px-6 py-4">{student.name}</td>
                    <td className="px-6 py-4">{student.email}</td>
                    <td className="px-6 py-4 capitalize">{student.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
