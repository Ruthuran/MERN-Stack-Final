import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserGraduate,
  FaEdit,
  FaCheckCircle,
  FaClock,
  FaBook,
  FaTimes,
  FaPlusCircle,
} from "react-icons/fa";

const MentorCourses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [syllabus, setSyllabus] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const user = JSON.parse(localStorage.getItem("ruthenix_user"));
  const mentorId = user?._id || user?.id;

  const fetchMentorCourses = async () => {
    if (!mentorId) {
      setError("Mentor ID not found. Please login again.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/courses?mentorId=${mentorId}`
      );
      if (data && data.length > 0) {
        setCourses(data);
        setError("");
      } else {
        setCourses([]);
        setError("No course assigned to this mentor.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch mentor courses.");
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentorCourses();
  }, [mentorId]);

  const handleEditClick = (course) => {
    setSelectedCourse(course);
    setSyllabus(course.syllabus || []);
    setIsModalOpen(true);
  };

  const handleSyllabusChange = (index, field, value) => {
    setSyllabus((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const addSyllabusItem = () =>
    setSyllabus((prev) => [...prev, { name: "", pdf: "", video: "" }]);

  const removeSyllabusItem = (index) =>
    setSyllabus((prev) => prev.filter((_, i) => i !== index));

  const saveSyllabus = async () => {
    if (!selectedCourse) return;
    setIsSaving(true);
    try {
      await axios.put(
        `http://localhost:5000/api/courses/${selectedCourse._id}/syllabus`,
        { mentorId, syllabus }
      );
      alert("Syllabus updated!");
      setIsModalOpen(false);
      fetchMentorCourses();
    } catch (err) {
      console.error("Error updating syllabus:", err);
      alert("Failed to update syllabus.");
    } finally {
      setIsSaving(false);
    }
  };

  const getStatusBadge = (status) => {
    const base =
      "px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2";
    switch (status) {
      case "Active":
        return `${base} bg-green-100 text-green-700`;
      case "In Progress":
        return `${base} bg-yellow-100 text-yellow-800`;
      case "Completed":
        return `${base} bg-blue-100 text-blue-700`;
      default:
        return base;
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 mt-6">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-indigo-900">📚 My Courses</h2>

        {loading && <p className="text-gray-500">Loading courses...</p>}
        {error && <p className="text-red-600">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white shadow-xl rounded-3xl p-6 transition hover:shadow-2xl hover:scale-105 w-full md:w-[350px] lg:w-[700px]" // Updated width for cards
            >
              <h3 className="text-xl font-semibold text-indigo-700">{course.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{course.tagline}</p>

              <div className="flex justify-between items-center mb-4">
                <span className="flex items-center gap-2 text-sm text-gray-500">
                  <FaUserGraduate /> {course.students || "N/A"} Students
                </span>
                <span className={getStatusBadge(course.status || "Active")}>
                  {course.status === "In Progress" && <FaClock />}
                  {["Active", "Completed"].includes(course.status) && <FaCheckCircle />}
                  {course.status || "Active"}
                </span>
              </div>

              <button
                onClick={() => handleEditClick(course)}
                className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 text-sm mb-4"
              >
                <FaEdit /> Edit Syllabus
              </button>

              <div>
                <h4 className="text-md font-semibold text-gray-700 mb-1 flex items-center gap-2">
                  <FaBook /> Syllabus:
                </h4>
                {course.syllabus?.length > 0 ? (
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                    {course.syllabus.map((item, index) => (
                      <li key={index} className="flex flex-col gap-1">
                        <span className="font-medium">{item.name}</span>
                        <div className="flex gap-4">
                          {item.pdf && (
                            <a
                              href={item.pdf}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-600 hover:underline text-xs"
                            >
                              PDF
                            </a>
                          )}
                          {item.video && (
                            <a
                              href={item.video}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-600 hover:underline text-xs"
                            >
                              Video
                            </a>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No syllabus items available.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-20"
          onKeyDown={(e) => e.key === "Escape" && setIsModalOpen(false)}
        >
          <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-2xl overflow-y-auto max-h-[80vh]">
            <h3 className="text-xl font-bold mb-4">Edit Syllabus</h3>

            {syllabus.map((item, index) => (
              <div key={index} className="mb-4 border p-4 rounded-lg bg-gray-50">
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">Topic Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Introduction to React"
                    value={item.name}
                    onChange={(e) =>
                      handleSyllabusChange(index, "name", e.target.value)
                    }
                    className="w-full mt-1 p-2 border rounded"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">PDF URL</label>
                  <input
                    type="text"
                    placeholder="https://example.com/file.pdf"
                    value={item.pdf}
                    onChange={(e) =>
                      handleSyllabusChange(index, "pdf", e.target.value)
                    }
                    className="w-full mt-1 p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Video URL</label>
                  <input
                    type="text"
                    placeholder="https://youtube.com/..."
                    value={item.video}
                    onChange={(e) =>
                      handleSyllabusChange(index, "video", e.target.value)
                    }
                    className="w-full mt-1 p-2 border rounded"
                  />
                </div>
                <button
                  onClick={() => removeSyllabusItem(index)}
                  className="mt-2 text-red-500 text-sm"
                >
                  <FaTimes className="inline mr-1" /> Remove
                </button>
              </div>
            ))}

            <button
              onClick={addSyllabusItem}
              className="text-green-600 hover:underline text-sm mb-4 flex items-center gap-1"
            >
              <FaPlusCircle /> Add New Topic
            </button>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={saveSyllabus}
                disabled={isSaving}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                {isSaving ? "Saving..." : "Save Syllabus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorCourses;
