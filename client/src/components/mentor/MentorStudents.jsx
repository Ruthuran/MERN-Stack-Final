import React, { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

const MentorSubmissions = () => {
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    courseId: "",
    deadline: "",
  });
  const [mentorId, setMentorId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [studentNames, setStudentNames] = useState({});
  const [maintenanceMessage, setMaintenanceMessage] = useState(false); // Added state for maintenance message

  useEffect(() => {
    const loadData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("ruthenix_user"));
        if (!user?.id) {
          setError("Mentor data not found.");
          return;
        }
        setMentorId(user.id);
        await fetchCourses();
        await fetchAssignmentsAndSubmissions(user.id);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Something went wrong while loading data.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await api.get("/courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Error fetching courses.");
    }
  };

  const fetchAssignmentsAndSubmissions = async (mentorId) => {
    try {
      const res = await api.get(`/assignments/mentor?mentorId=${mentorId}`);
      const assignmentList = Array.isArray(res.data.data) ? res.data.data : [];
      setAssignments(assignmentList);

      let allSubmissions = [];
      let studentIdSet = new Set();

      assignmentList.forEach((assignment) => {
        (assignment.submissions || []).forEach((sub) => {
          allSubmissions.push({
            ...sub,
            assignmentId: {
              _id: assignment._id,
              title: assignment.title,
            },
          });
          studentIdSet.add(sub.studentId);
        });
      });

      setSubmissions(allSubmissions);
      await fetchStudentNames(Array.from(studentIdSet));
    } catch (err) {
      console.error("Error fetching assignments/submissions:", err);
      setError("Error fetching assignments or submissions.");
    }
  };

  const fetchStudentNames = async (studentIds) => {
    try {
      const namesMap = {};
      const promises = studentIds.map((id) =>
        api
          .get("/users", { params: { studentId: id } })
          .then((res) => {
            namesMap[id] = res.data.name || "Unknown";
          })
          .catch(() => {
            namesMap[id] = "Unknown";
          })
      );
      await Promise.all(promises);
      setStudentNames(namesMap);
    } catch (err) {
      console.error("Error fetching student names:", err);
      setError("Error fetching student names.");
    }
  };

  useEffect(() => {
    if (assignments.length > 0 && courses.length > 0) {
      const assignedCourseIds = [...new Set(assignments.map((a) => a.courseId._id))];
      const assigned = courses.filter((c) => assignedCourseIds.includes(c._id));
      setAssignedCourses(assigned);
    }
  }, [courses, assignments]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    const { title, description, courseId, deadline } = form;

    if (!title || !description || !courseId || !deadline) {
      alert("⚠️ Please fill in all fields.");
      return;
    }

    try {
      setCreating(true);
      await api.post("/assignments/create", {
        title,
        description,
        courseId,
        deadline,
        assignedBy: mentorId,
      });

      setForm({ title: "", description: "", courseId: "", deadline: "" });
      alert("✅ Assignment created successfully.");
      fetchAssignmentsAndSubmissions(mentorId);
    } catch (err) {
      console.error("Assignment creation failed:", err);
      alert("❌ Failed to create assignment.");
    } finally {
      setCreating(false);
    }
  };

  const handleReviewSubmission = async (submissionId, grade, feedback) => {
    try {
      await api.put(`/submissions/review/${submissionId}`, { grade, feedback });
      alert("✅ Submission reviewed successfully.");
      fetchAssignmentsAndSubmissions(mentorId);
    } catch (err) {
      console.error("Error reviewing submission:", err);
      alert("❌ Failed to review submission.");
    }
  };

  if (error) return <div className="text-red-600 p-4">{error}</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 font-sans text-[1.05rem]">
    <div className="p-6">
      {/* Assignment Creation Section */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📝 Create Assignment</h2>
      <form onSubmit={handleCreateAssignment} className="bg-white shadow-md rounded-2xl p-4 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">New Assignment</h3>
        <div className="mb-4">
          <label htmlFor="courseId" className="block font-medium text-gray-700">Select Course</label>
          <select
            id="courseId"
            name="courseId"
            value={form.courseId}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>{course.name}</option>
            ))}
          </select>
        </div>
  
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter assignment title"
          />
        </div>
  
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter assignment description"
          />
        </div>
  
        <div className="mb-4">
          <label htmlFor="deadline" className="block font-medium text-gray-700">Deadline</label>
          <input
            type="datetime-local"
            id="deadline"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
  
        <button
          type="submit"
          disabled={creating}
          className={`bg-blue-500 text-white px-4 py-2 rounded-md ${creating ? "opacity-50" : ""}`}
        >
          {creating ? "Creating..." : "Create Assignment"}
        </button>
      </form>
  
      {/* Assigned Courses */}
      <div className="bg-white shadow-md rounded-2xl p-4 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">📚 Assigned Courses</h3>
        {assignedCourses.length === 0 ? (
          <p className="text-gray-600">No courses assigned.</p>
        ) : (
          <ul className="list-disc pl-6 text-gray-800">
            {assignedCourses.map((course) => (
              <li key={course._id}>{course.name}</li>
            ))}
          </ul>
        )}
      </div>
  
      {/* Review Submissions */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📥 Review Submissions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">Assignment Title</th>
              <th className="px-4 py-2 border">Student</th>
              <th className="px-4 py-2 border">File</th>
              <th className="px-4 py-2 border">Grade</th>
              <th className="px-4 py-2 border">Feedback</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Submitted At</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub) => (
              <tr key={sub._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{sub.assignmentId?.title}</td>
                <td className="px-4 py-2 border">{studentNames[sub.studentId] || "Loading..."}</td>
                <td className="px-4 py-2 border">
                  <a
                    href={sub.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View
                  </a>
                </td>
                <td className="px-4 py-2 border">{sub.grade || "-"}</td>
                <td className="px-4 py-2 border">{sub.feedback || "-"}</td>
                <td className="px-4 py-2 border">{sub.status}</td>
                <td className="px-4 py-2 border">
                  {new Date(sub.submittedAt).toLocaleString()}
                </td>
                <td className="px-4 py-2 border">
                  <button
                    className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                    onClick={() => setMaintenanceMessage(true)}
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      {/* Maintenance Message */}
      {maintenanceMessage && (
        <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded">
          <p className="text-lg font-semibold">⚠️ This section is currently under maintenance.</p>
          <p>Please check back later. We're working on improving this feature!</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default MentorSubmissions;
