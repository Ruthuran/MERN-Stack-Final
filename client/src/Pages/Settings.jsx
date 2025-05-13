import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../components/DarkModeContext";

const StudentSettings = () => {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useDarkMode();

  const [notifications, setNotifications] = useState({
    assignments: true,
    quizzes: true,
    announcements: true,
  });

  const [learningStyle, setLearningStyle] = useState("video");
  const [progressVisibility, setProgressVisibility] = useState("private");
  const [password, setPassword] = useState("");

  const handleNotificationChange = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleSave = () => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
    localStorage.setItem("learningStyle", learningStyle);
    localStorage.setItem("progressVisibility", progressVisibility);
    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-purple-600 hover:underline"
        >
          ← Back
        </button>

        <h2 className="text-3xl font-bold">Student Settings</h2>

        {/* Dark Mode Toggle */}
        <div className="flex justify-between items-center">
          <span className="font-medium">Dark Mode</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-14 h-8 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full p-1 transition-colors duration-300 ${
              darkMode ? "justify-end bg-purple-600" : "justify-start"
            }`}
          >
            <div className="w-6 h-6 bg-white rounded-full shadow-md transition" />
          </button>
        </div>

        {/* Notifications */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Notifications</h3>
          {["assignments", "quizzes", "announcements"].map((type) => (
            <div key={type} className="flex justify-between items-center py-1">
              <span className="capitalize">{type} Notifications</span>
              <button
                onClick={() => handleNotificationChange(type)}
                className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${
                  notifications[type]
                    ? "justify-end bg-purple-600"
                    : "justify-start bg-gray-300 dark:bg-gray-600"
                }`}
              >
                <div className="w-6 h-6 bg-white rounded-full shadow-md transition" />
              </button>
            </div>
          ))}
        </div>

        {/* Learning Style */}
        <div>
          <label className="block font-medium mb-1">Preferred Learning Style</label>
          <select
            value={learningStyle}
            onChange={(e) => setLearningStyle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="video">Video-Based</option>
            <option value="text">Text-Based</option>
            <option value="mixed">Mixed (Video + Text)</option>
          </select>
        </div>

        {/* Progress Visibility */}
        <div>
          <label className="block font-medium mb-1">Course Progress Visibility</label>
          <select
            value={progressVisibility}
            onChange={(e) => setProgressVisibility(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="friends">Friends Only</option>
          </select>
        </div>

        {/* Change Password */}
        <div>
          <label className="block font-medium mb-1">New Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        {/* Save Button */}
        <div className="text-right">
          <button
            onClick={handleSave}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Save Changes
          </button>
        </div>

        {/* Danger Zone */}
        <div className="pt-4 border-t border-gray-300 dark:border-gray-600">
          <h3 className="text-xl font-semibold text-red-500 mb-2">Danger Zone</h3>
          <button
            onClick={() => alert("Account deletion flow")}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
          >
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentSettings;
