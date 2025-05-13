import React, { useState } from "react";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("ruthenix_user", JSON.stringify(updatedUser));
    toast.success("Profile updated successfully!");
    setIsEditing(false);
    window.location.reload();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setUpdatedUser({ ...updatedUser, avatar: imageURL });
    }
  };

  if (!user) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-200">Please login to view your profile.</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-2xl rounded-3xl p-10">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-indigo-300 hover:bg-indigo-700 hover:text-white px-4 py-2 rounded-full transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-bold text-lg">Back</span>
          </button>
          <h2 className="text-4xl font-extrabold text-center w-full -ml-16">My Profile</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Avatar */}
          <div className="relative group self-center md:self-start">
            <img
              src={updatedUser.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              alt="Avatar"
              className="w-40 h-40 rounded-full object-cover border-4 border-indigo-500 shadow-lg group-hover:scale-105 transition-transform duration-300"
            />
            <label className="absolute bottom-2 right-2 bg-indigo-600 text-white rounded-full p-2 cursor-pointer hover:bg-indigo-700 shadow-md transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <span className="text-xl font-bold">+</span>
            </label>
          </div>

          {/* Info Section */}
          <div className="flex-1 space-y-5 w-full">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Profile Information</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-indigo-300 hover:underline font-semibold text-lg"
                >
                  Edit
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition"
                >
                  Save
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: "Name", name: "name", type: "text" },
                { label: "Phone", name: "phone", type: "text" },
                { label: "Location", name: "location", type: "text" },
                { label: "Birthday", name: "birthday", type: "date" },
                { label: "Education Level", name: "education", type: "select", options: ["High School", "Undergraduate", "Graduate", "PhD", "Other"] },
                { label: "Gender", name: "gender", type: "select", options: ["Male", "Female", "Non-binary", "Prefer not to say"] },
                { label: "Occupation", name: "occupation", type: "select", options: ["Student", "Employed", "Unemployed", "Freelancer", "Other"] },
                { label: "Course", name: "course", type: "text" },
              ].map(({ label, name, type, options }) => (
                <div key={name}>
                  <label className="block text-sm font-bold text-gray-600 dark:text-gray-300 mb-1">{label}</label>
                  {isEditing ? (
                    type === "select" ? (
                      <select
                        name={name}
                        value={updatedUser[name] || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-500 focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="">Select</option>
                        {options.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={type}
                        name={name}
                        value={updatedUser[name] || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-500 focus:ring-2 focus:ring-indigo-500"
                      />
                    )
                  ) : (
                    <p className="text-lg font-semibold mt-1">
                      {user[name] || "Not set"}
                    </p>
                  )}
                </div>
              ))}

              <div>
                <label className="block text-sm font-bold text-gray-600 dark:text-gray-300 mb-1">Email</label>
                <p className="text-lg font-semibold mt-1">{user.email}</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-600 dark:text-gray-300 mb-1">Role</label>
                <p className="text-lg font-semibold capitalize mt-1">{user.role}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button className="bg-yellow-500 text-white px-6 py-2 font-bold rounded hover:bg-yellow-600 transition">
                Change Password
              </button>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-6 py-2 font-bold rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
