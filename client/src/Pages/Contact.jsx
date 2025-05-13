import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Contact = () => {
  const navigate = useNavigate();
  const [messageSent, setMessageSent] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleBack = () => {
    try {
      navigate(-1);
    } catch {
      navigate("/dashboard");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessageSent(true);

    // Simulate API or processing delay
    setTimeout(() => {
      setMessageSent(false);
    }, 6000);

    // Clear form
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 py-10 px-6 dark:bg-gradient-to-tr dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-white bg-gradient-to-tr from-indigo-500 to-purple-600 px-5 py-2 rounded-full shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5 dark:bg-gradient-to-tr dark:from-indigo-700 dark:to-purple-700"
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
          <span className="font-medium">Back</span>
        </button>
      </div>

      {/* Heading */}
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center drop-shadow-md dark:text-gray-100">
        Get in Touch
      </h2>

      {/* Success Message */}
      {messageSent && (
        <div className="max-w-xl mx-auto mb-6 p-6 rounded-3xl bg-green-100 text-green-800 shadow-lg border border-green-300 animate-fade-in-down dark:bg-green-900 dark:text-green-200 dark:border-green-600">
          <div className="flex items-center gap-4">
            <span className="text-3xl">✅</span>
            <div>
              <h3 className="text-xl font-bold">Message Sent!</h3>
              <p className="text-sm">🎉 Our team will contact you shortly. Thanks for reaching out!</p>
            </div>
          </div>
        </div>
      )}

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-2xl space-y-6 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
      >
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2 dark:text-gray-300">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none transition dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-purple-600 dark:focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2 dark:text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none transition dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-purple-600 dark:focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2 dark:text-gray-300">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            required
            placeholder="Your message"
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none transition dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-purple-600 dark:focus:outline-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white text-lg font-semibold py-3 rounded-xl hover:scale-105 transition-transform shadow-md hover:shadow-lg dark:bg-gradient-to-tr dark:from-purple-700 dark:to-indigo-700"
        >
          ✉️ Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
