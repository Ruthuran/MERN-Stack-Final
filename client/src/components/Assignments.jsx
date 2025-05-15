import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState({});
  const [isSubmitting, setIsSubmitting] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [assignmentLinks, setAssignmentLinks] = useState({});

  const navigate = useNavigate();
  const studentId = JSON.parse(localStorage.getItem("ruthenix_user"))?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const assignmentRes = await axios.get(
          "https://mern-stack-final-server.onrender.com/api/assignments"
        );

        const submissionRes = await axios.get(
          `https://mern-stack-final-server.onrender.com/api/assignments/submissions/${studentId}`
        );

        const submittedAssignmentIds = submissionRes.data.map(
          (sub) => sub.assignmentId
        );
        const statusMap = {};
        submittedAssignmentIds.forEach((id) => {
          statusMap[id] = "success";
        });

        setAssignments(assignmentRes.data.data);
        setSubmissionStatus(statusMap);
      } catch (err) {
        console.error("Error fetching data", err);
        setError("Failed to load assignments or submissions.");
      } finally {
        setLoading(false);
      }
    };

    if (studentId) fetchData();
  }, [studentId]);

  const handleSubmit = async (e, assignmentId) => {
    e.preventDefault();
    setIsSubmitting((prev) => ({ ...prev, [assignmentId]: true }));

    if (!studentId) {
      setError("Student ID not found. Please log in.");
      setIsSubmitting((prev) => ({ ...prev, [assignmentId]: false }));
      return;
    }

    try {
      await axios.post(
        `https://mern-stack-final-server.onrender.com/api/assignments/submit/${assignmentId}`,
        {
          link: assignmentLinks[assignmentId],
          studentId,
        }
      );

      setSubmissionStatus((prev) => ({
        ...prev,
        [assignmentId]: "success",
      }));
      setAssignmentLinks((prev) => ({ ...prev, [assignmentId]: "" }));

      setTimeout(() => {
        setSubmissionStatus((prev) => ({
          ...prev,
          [assignmentId]: null,
        }));
      }, 3000);
    } catch (err) {
      console.error("Failed to submit assignment", err);
      setSubmissionStatus((prev) => ({
        ...prev,
        [assignmentId]: "failure",
      }));
    } finally {
      setIsSubmitting((prev) => ({ ...prev, [assignmentId]: false }));
    }
  };

  const handleLinkChange = (e, assignmentId) => {
    setAssignmentLinks({
      ...assignmentLinks,
      [assignmentId]: e.target.value,
    });
  };

  if (loading) return <div>Loading assignments...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 font-sans text-[1.05rem]">
      <div className="bg-gray-50 min-h-screen p-6">
        <div className="p-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-indigo-600 hover:text-white hover:bg-gradient-to-tr from-indigo-500 to-purple-600 px-4 py-2 rounded-full shadow-sm border border-gray-300 transition-all duration-300 ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </button>
        </div>

        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Assignments</h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {assignments.length > 0 ? (
            assignments.map(({ _id, title, description, deadline, status }) => (
              <div
                key={_id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-bold text-indigo-600 mb-2">{title}</h2>
                <p className="text-gray-500 mb-1">
                  {description && ${description.slice(0, 100)}...}
                </p>
                <p className="text-gray-500 mb-2">
                  Due: {new Date(deadline).toLocaleDateString()}
                </p>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {status}
                </span>

                {status === "Pending" && submissionStatus[_id] !== "success" && (
                  <div className="mt-4">
                    <form onSubmit={(e) => handleSubmit(e, _id)}>
                      <div className="mb-4">
                        <label
                          htmlFor="assignment-link"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Assignment Submission Link
                        </label>
                        <input
                          type="url"
                          id="assignment-link"
                          value={assignmentLinks[_id] || ""}
                          onChange={(e) => handleLinkChange(e, _id)}
                          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Paste your assignment link here"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300"
                        disabled={isSubmitting[_id]}
                      >
                        {isSubmitting[_id] ? "Submitting..." : "Submit Assignment"}
                      </button>
                    </form>

                    {submissionStatus[_id] && (
                      <div
                        className={`mt-4 p-3 rounded-lg text-white ${
                          submissionStatus[_id] === "success"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {submissionStatus[_id] === "success"
                          ? "Your assignment was successfully submitted!"
                          : "Something went wrong, please try again."}
                      </div>
                    )}
                  </div>
                )}

                {submissionStatus[_id] === "success" && (
                  <div className="mt-4 text-green-600 font-medium">
                    You have already submitted this assignment.
                  </div>
                )}
              </div>
            ))
          ) : (
            <div>No assignments available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assignments;
