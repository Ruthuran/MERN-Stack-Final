import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import axiosInstance from "../components/axiosInstance";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();

  const from = location.state?.from?.pathname || "/";
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form data change (email and password)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  // Form validation for email and password
  const validateForm = () => {
    const { email, password } = formData;
    if (!email || !password) return "Please fill in all fields.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return null;
  };

  // Handle the login process (API call)
  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    // Validate form data before submitting
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      const requestBody = {
        email: formData.email,
        password: formData.password,
      };

      const response = await axiosInstance.post("/api/auth/login", requestBody);
      const { user, token } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("ruthenix_user", JSON.stringify(user));
      setUser(user);

      // Redirect based on the user's role
      if (user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else if (user.role === "mentor") {
        navigate("/mentor/dashboard", { replace: true });
      } else if (user.role === "student") {
        navigate("/", { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      // Handle backend errors (e.g., invalid credentials)
      const backendMessage = err?.response?.data?.message;
      setError(backendMessage || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Section */}
      <div className="w-full md:w-1/2 bg-gradient-to-b from-blue-600 to-indigo-700 text-white flex flex-col justify-center items-center p-8">
        <h1 className="text-4xl font-bold mb-4">Welcome Back to Ruthenix</h1>
        <p className="text-lg text-center max-w-md">
          Empowering your learning journey with 100+ industry-ready courses.
        </p>
        <img
          src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7892.jpg"
          alt="Login Illustration"
          className="w-full max-w-md mt-8"
        />
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-12 bg-gray-50">
        <div className="w-full max-w-md">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <h2 className="text-2xl font-bold mb-6 text-gray-800">Login to Ruthenix</h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

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
                  required
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-2 text-sm text-indigo-600 hover:underline focus:outline-none"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Link to="/forgot-password" className="text-sm text-indigo-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-2 rounded hover:scale-105 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
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

          <p className="mt-6 text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
