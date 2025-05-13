import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCreditCard, FaUniversity, FaMobileAlt, FaCheckCircle } from "react-icons/fa";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { course } = location.state || {}; // Access course data passed through navigate

  const [paymentMethod, setPaymentMethod] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", fromDate: "" });
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state for displaying error messages

  useEffect(() => {
    if (!course) {
      // Handle case if course data is not passed
      navigate("/courses");
    }
  }, [course, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (!formData.name || !formData.email || !formData.phone || !paymentMethod || !formData.fromDate) {
      alert("⚠️ Please fill out all the fields before proceeding!");
      return;
    }

    setLoading(true);
    setError("");

    const receiptData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      paymentMethod,
      fromDate: formData.fromDate,
      course: course?.name,
      instructor: course?.instructor,
      amount: Number(course?.amount.replace(/[^0-9.-]+/g, "")), // ← fixed
    };

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    fetch(`${API_URL}/api/enrollments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(receiptData),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 400) {
            // Enrollment already exists error
            setError("⚠️ You are already enrolled in this course.");
            throw new Error("You are already enrolled in this course.");
          }
          throw new Error("Enrollment failed! Please try again.");
        }
        return response.json();
      })
      .then((data) => {
        setIsPaid(true);
        setFormData({ name: "", email: "", phone: "", fromDate: "" });
        setTimeout(() => navigate("/courses"), 5000);
      })
      .catch((err) => {
        console.error("Error:", err);
        // Handle any other errors here, including network issues
        if (!err.message.includes("already enrolled")) {
          setError("⚠️ There was an issue processing your payment. Please try again.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4 sm:px-8">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-xl p-6 sm:p-10">
        {isPaid ? (
          <div className="text-center p-6 animate-fade-in-up">
            <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">🎉 Payment Successful!</h2>
            <p className="text-gray-600 mt-2">Thank you for your payment.</p>

            <div className="mt-6 bg-gray-100 p-4 rounded-lg text-left">
              <h3 className="text-lg font-semibold text-gray-700">🧾 Receipt</h3>
              <div className="text-gray-600 mt-2">
                <p><strong className="font-bold">Name:</strong> {formData.name}</p>
                <p><strong className="font-bold">Email:</strong> {formData.email}</p>
                <p><strong className="font-bold">Phone:</strong> {formData.phone}</p>
                <p><strong className="font-bold">Course:</strong> {course?.name}</p>
                <p><strong className="font-bold">Instructor:</strong> {course?.instructor}</p>
                <p><strong className="font-bold">Amount Paid:</strong> {course?.amount.toLocaleString()}</p>
                <p><strong className="font-bold">Payment Mode:</strong> {paymentMethod.toUpperCase()}</p>
                <p><strong className="font-bold">Start Date:</strong> {formData.fromDate}</p>
              </div>
            </div>

            <button
              onClick={() => navigate("/courses")}
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all"
            >
              📚 Go to My Courses
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">💳 Secure Payment</h2>

            {/* User Info Form */}
            <div className="bg-gray-100 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">👤 Fill in Your Details</h3>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* Date Picker */}
              <input
                type="date"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Payment Method */}
            <h4 className="text-lg font-semibold text-gray-700 mb-3">💰 Select Payment Method</h4>
            <div className="space-y-3">
              {[{ id: "card", label: "Credit / Debit Card", icon: <FaCreditCard /> },
              { id: "upi", label: "UPI (PhonePe / GPay / Paytm)", icon: <FaMobileAlt /> },
              { id: "bank", label: "Net Banking", icon: <FaUniversity /> }].map((option) => (
                <label
                  key={option.id}
                  htmlFor={option.id}
                  className="flex items-center space-x-3 cursor-pointer bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition"
                >
                  <input
                    type="radio"
                    id={option.id}
                    name="payment"
                    value={option.id}
                    checked={paymentMethod === option.id}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="form-radio text-blue-500"
                  />
                  <span className="text-blue-600">{option.icon}</span>
                  <span>{option.label}</span>
                </label>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-gray-100 rounded-lg p-6 shadow-inner mt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">📦 Order Summary</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>Course:</span>
                  <span className="font-medium">{course?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Instructor:</span>
                  <span>{course?.instructor}</span>
                </div>
                <div className="flex justify-between font-bold text-green-600 border-t pt-3">
                  <span>Total:</span>
                  <span>₹{course?.amount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Order Button */}
            {error && <p className="text-red-600 text-center">{error}</p>}
            <button
              onClick={handlePlaceOrder}
              disabled={loading} // Disable button while loading
              className={`mt-6 w-full ${loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} text-white py-3 rounded-lg font-semibold text-lg transition-all`}
            >
              {loading ? "Processing..." : "✅ Place Order & Enroll"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
