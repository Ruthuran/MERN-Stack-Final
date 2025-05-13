import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const validatePasswordStrength = (password) => {
  return typeof password === 'string' && password.length >= 6;
};


const MentorSignup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    expertise: "",
    experience: "",
    bio: "",
    portfolio: "",
  });

  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState(""); // Password error state
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    // Clear password error when user is typing
    if (e.target.name === "password") {
      setPasswordError(""); // Reset password error when user changes password
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // Prevent double submissions

    // Check required fields
    const requiredFields = ["name", "email", "password", "expertise", "experience"];
    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        return setError(`Please fill all required fields: ${field}`);
      }
    }

    // Password strength validation
    if (!validatePasswordStrength(formData.password)) {
      return setPasswordError(
        "Password must be at least 6 characters long."
      );
    }

    if (formData.experience <= 0) {
      return setError("Experience must be a positive number.");
    }

    setLoading(true);
    setError(""); // Reset previous errors

    const API_URL = `${import.meta.env.VITE_SERVER_URL || "http://localhost:5000"}/api/mentors/signup`;

    try {
      console.log("Mentor signup API URL:", API_URL); // Debugging

      const res = await axios.post(API_URL, {
        ...formData,
        role: "mentor",
        status: "pending", // Status set to pending
      });

      if (res.status === 201 || res.data.success) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          password: "",
          expertise: "",
          experience: "",
          bio: "",
          portfolio: "",
        });
      } else {
        setError(res.data.message || "Application failed.");
      }
    } catch (err) {
      console.error("Mentor signup error:", err.response ? err.response.data : err.message);
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="max-w-lg w-full bg-white rounded shadow-lg p-8">
        {!submitted ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Mentor Application</h2>
            {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
            {passwordError && <p className="text-red-500 text-sm mb-4 text-center">{passwordError}</p>} {/* Show password error */}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-2 text-sm text-blue-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Expertise */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Expertise</label>
                <input
                  name="expertise"
                  type="text"
                  value={formData.expertise}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  placeholder="e.g., React, ML"
                  required
                />
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                <input
                  name="experience"
                  type="number"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  rows={3}
                  placeholder="Tell us about yourself..."
                />
              </div>

              {/* Portfolio / LinkedIn */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Portfolio / LinkedIn</label>
                <input
                  name="portfolio"
                  type="url"
                  value={formData.portfolio}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${loading && "opacity-50 cursor-not-allowed"}`}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Apply to Become Mentor"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-green-600">🎉 Application Submitted!</h2>
            <p className="text-gray-700">
              Thank you for applying to become a mentor. Our team will review your application.
            </p>
            <ul className="text-left text-sm text-gray-600 list-disc list-inside">
              <li>✅ Your application is under review.</li>
              <li>🕐 You will be notified via email once approved.</li>
              <li>🔐 You cannot log in until you're approved by an admin.</li>
              <li>📧 Keep your <strong>email and password</strong> safe for future login.</li>
              <li>📞 An admin might contact you for additional info.</li>
            </ul>
            <button
              onClick={() => navigate("/login")}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorSignup;
