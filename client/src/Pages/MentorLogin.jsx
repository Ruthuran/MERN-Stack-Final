import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

const MentorLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const validateForm = () => {
    const { identifier, password } = formData;
    if (!identifier || !password) {
      return "Please fill in all fields.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    return null;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/auth/mentor-login`, {
        identifier: formData.identifier,  // Pass the identifier (email, name, or userId)
        password: formData.password,
      });

      const { user, token } = response.data;

      if (user.role === "mentor" && !user.isApproved) {
        setError("🚫 Your mentor application is under review. Please wait for approval.");
        setLoading(false);
        return;
      }

      localStorage.setItem("ruthenix_token", token);
      localStorage.setItem("ruthenix_user", JSON.stringify(user));

      navigate("/mentor/dashboard", { replace: true });
    } catch (err) {
      console.error("Login Error:", err);
      const backendMessage = err?.response?.data?.message || err?.message || "Something went wrong. Please try again.";
      setError(`❗ ${backendMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left side */}
      <div className="w-full md:w-1/2 bg-gradient-to-b from-blue-600 to-indigo-700 text-white flex flex-col justify-center items-center p-8">
        <h1 className="text-4xl font-bold mb-4">Mentor Login</h1>
        <p className="text-lg text-center max-w-md">
          Empowering you to mentor the next generation of learners.
        </p>
        <img
          src="https://img.freepik.com/free-vector/online-teaching-concept-illustration_114360-1675.jpg"
          alt="Mentor Login Illustration"
          className="w-full max-w-md mt-8"
        />
      </div>

      {/* Right side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-12 bg-gray-50">
        <div className="w-full max-w-md">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded mb-4 text-sm flex items-center gap-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <h2 className="text-2xl font-bold mb-6 text-gray-800">Login to Mentor Dashboard</h2>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Identifier Input */}
            <div>
              <label htmlFor="identifier" className="block text-gray-700 mb-1">
                Email, Name, or ID
              </label>
              <input
                id="identifier"
                name="identifier"
                type="text"
                value={formData.identifier}
                onChange={handleChange}
                placeholder="Enter your email, name, or ID"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-2 text-sm text-indigo-600 hover:underline focus:outline-none"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-2 rounded hover:scale-105 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MentorLogin;
