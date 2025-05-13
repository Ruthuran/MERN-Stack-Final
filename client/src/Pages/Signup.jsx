import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const roleFromState = location.state?.role || null;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(roleFromState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!roleFromState) {
      setRole(null);
    }
  }, [roleFromState]);

  const validateForm = () => {
    if (!name || !email || !password) {
      setError("All fields are required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }

    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!role) {
      setError("Please select a role first.");
      return;
    }

    if (!validateForm()) return;

    setLoading(true);
    setError("");

    const formattedEmail = email.trim().toLowerCase();

    const API_URL = `${
      import.meta.env.VITE_SERVER_URL || "http://localhost:5000"
    }/api/auth/signup`;

    try {
      const { data } = await axios.post(API_URL, {
        name,
        email: formattedEmail,
        password,
        role,
      });

      if (data.success) {
        toast.success("Account created successfully! 🎉");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <ToastContainer />

      {/* Left Section */}
      <div className="w-full md:w-1/2 bg-gradient-to-b from-indigo-600 to-purple-700 text-white flex flex-col justify-center items-center p-8">
        <h1 className="text-4xl font-bold mb-4 animate__animated animate__fadeInDown">
          Join Ruthenix Today
        </h1>
        <p className="text-lg text-center max-w-md animate__animated animate__fadeInUp">
          Create your free account and access 100+ industry-ready courses!
        </p>
        <img
          src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7875.jpg"
          alt="Signup Illustration"
          className="w-full max-w-md mt-8 animate__animated animate__zoomIn"
        />
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-gray-50">
        {role === null ? (
          <div className="w-full max-w-md space-y-6 animate__animated animate__fadeIn">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              Select Your Role
            </h2>
            <div className="space-y-4">
              <button
                onClick={() => handleRoleSelect("Student")}
                className="w-full flex items-center justify-center bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-5 rounded-lg shadow-lg hover:scale-105 transition transform"
              >
                <img
                  src="https://img.icons8.com/ios/452/student-male.png"
                  alt="Student Icon"
                  className="w-12 h-12 mr-4"
                />
                <span className="text-xl">Student</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md animate__animated animate__fadeIn">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              Sign Up as {role}
            </h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-gray-700">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 p-2 rounded mt-1 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  required
                  autoComplete="email"
                  placeholder="Enter your email address"
                  className="w-full border border-gray-300 p-2 rounded mt-1 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  placeholder="Create a password"
                  className="w-full border border-gray-300 p-2 rounded mt-1 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button
                type="submit"
                className={`w-full flex justify-center items-center bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-2 rounded hover:scale-105 transition ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
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
                  <>Sign Up as {role}</>
                )}
              </button>
            </form>

            <p className="text-center text-sm mt-6 text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-teal-500 hover:underline">
                Log In
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
