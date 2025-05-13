import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const MentorDashboard = () => {
  const [mentor, setMentor] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Function to fetch enrollments
  const fetchEnrollments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/enrollments");
      setStudents(res.data.enrollments); // Assuming 'enrollments' is the array of students in the response
    } catch (err) {
      console.error(err);
      setError("Failed to load enrolled students.");
      toast.error("Error fetching student data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const mentorData = JSON.parse(localStorage.getItem("ruthenix_user"));

        if (!mentorData?.name) {
          setError("Mentor data not found.");
          return;
        }

        setMentor(mentorData);

        // Fetch the enrollments once the mentor data is available
        await fetchEnrollments();
      } catch (err) {
        console.error(err);
        setError("Failed to load mentor data.");
        toast.error("Error fetching mentor data.");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500 text-lg font-medium">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600 text-lg font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 font-sans text-[1.05rem]">
    <div className="p-6">
      {/* Mentor Info */}
      <div className="flex items-center gap-4 mb-8">
        <img
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${mentor?.name || "Mentor"}`}
          alt="Mentor Avatar"
          className="w-16 h-16 rounded-full border-4 border-indigo-500 shadow-md"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome back, {mentor?.name || "Mentor"}!
          </h2>
          <p className="text-gray-500">Your enrolled students</p>
        </div>
      </div>

      {/* Total Students Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-lg rounded-xl p-8 hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
          <h3 className="text-xl font-bold text-gray-700 mb-2">👨‍🎓 Total Students</h3>
          <p className="text-4xl font-semibold text-indigo-600">{students.length}</p>
        </div>
      </div>

      {/* Enrolled Students List */}
      <div className="bg-white p-4 rounded-lg shadow border">
        <h3 className="text-xl font-semibold mb-4 text-indigo-600">
          Enrolled Students
        </h3>
        {students.length === 0 ? (
          <p className="text-gray-500">No students enrolled yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {students.map((student, idx) => (
              <li key={idx} className="py-2">
                <p className="font-medium text-gray-800">{student.name}</p>
                <p className="text-sm text-gray-500">{student.email}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    </div>
  );
};

export default MentorDashboard;
