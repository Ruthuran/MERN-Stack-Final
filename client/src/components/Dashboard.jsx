import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from 'lucide-react';
import TestimonialCarousel from "./TestimonialCarousel";
import {FaFacebookF, FaTwitter, FaInstagram,FaLinkedinIn,} from "react-icons/fa";
import HeroCarousel from "./HeroCarousel";
import course1 from "../assets/course1.jpg"; 
import course2 from "../assets/course2.jpg";
import course3 from "../assets/course3.jpg";
import course4 from "../assets/course4.png";


// Featured Carousel Component
const FeaturedCarousel = ({ courses }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const chunkSize = 3;
  const totalSlides = Math.ceil(courses.length / chunkSize);

  const chunkCourses = () => {
    const chunks = [];
    for (let i = 0; i < courses.length; i += chunkSize) {
      chunks.push(courses.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const courseChunks = chunkCourses();

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {courseChunks.map((chunk, slideIndex) => (
          <div key={slideIndex} className="min-w-full flex gap-6 px-4">
            {chunk.map((course, index) => (
              <div
                key={index}
                className="flex-1 bg-gray-50 rounded-xl p-4 shadow-md hover:shadow-lg transition"
              >
                <img
                  src={course.img}
                  alt={course.title}
                  className="w-full h-[300px] object-cover rounded-lg mb-4"
                />
                <h4 className="text-lg font-semibold mb-2">{course.title}</h4>
                <p className="text-sm text-gray-600">{course.description}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === i ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Main Dashboard
const Dashboard = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query

  // Toggle Sidebar collapse
  const toggleSidebar = () => {
    setIsCollapsed(prevState => !prevState);
  };

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();  // Prevent page refresh on form submit
    console.log('Search query:', searchQuery);
    if (searchQuery.trim() !== '') {
      // Navigate to search results page with the search query as a query parameter
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const [courses] = useState([
    {
       id: 1,
       name: "Web Development",
       instructor: "Ankit Reddy",
       description: "Learn HTML, CSS, JavaScript, and more.",
       image: course1,
       category: "Programming",
       brand: "Ruthenix",
       rating: 4.5,
       originalPrice: "₹49,999",
       discountedPrice: "₹39,999",
       badge: "Bestseller",
     },
     {
       id: 2,
       name: "Data Science",
       instructor: "Priya Kumar",
       description: "Master Python, ML, and data analysis.",
       image: course2,
       category: "Data",
       brand: "Ruthenix",
       rating: 4.7,
       originalPrice: "₹99,999",
       discountedPrice: "₹89,999",
       badge: "Featured",
     },
     {
       id: 3,
       name: "UI/UX Design",
       instructor: "Rahul Dev",
       description: "Design engaging and user-friendly interfaces.",
       image: course3,
       category: "Design",
       brand: "Ruthenix",
       rating: 4.8,
       originalPrice: "₹60,999",
       discountedPrice: "₹56,999",
       badge: "Popular",
     },
     {
       id: 4,
       name: "Stock Marketing",
       instructor: "Meena Iyer",
       description: "Understand market trends and trading strategies.",
       image: course4,
       category: "Finance",
       brand: "Ruthenix",
       rating: 4.3,
       originalPrice: "₹55,999",
       discountedPrice: "₹48,499",
       badge: "Trending",
     },
   ]
  );

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
  {/* Sidebar */}
  <aside
    className={`transition-all duration-300 bg-gray-900 text-white flex flex-col items-center py-6 space-y-6 ${
      isCollapsed ? "w-20" : "w-64 px-4"
    }`}
  >
    <button
      onClick={() => setIsCollapsed(!isCollapsed)}
      className="text-white mx-auto text-xl"
      title="Toggle Menu"
    >
      {isCollapsed ? "☰" : "☰"}
    </button>

    <div className="text-2xl font-bold">
      {isCollapsed ? "R" : "Ruthenix"}
    </div>

    <button title="Dashboard" onClick={() => navigate("/")}>🏠 {isCollapsed ? "" : "Dashboard"}</button>
    <button title="Courses" onClick={() => navigate("/courses")}>📚 {isCollapsed ? "" : "Courses"}</button>
    <button title="Profile" onClick={() => navigate("/profile")}>👤 {isCollapsed ? "" : "Profile"}</button>
    <button title="Contact" onClick={() => navigate("/contact")}>✉️ {isCollapsed ? "" : "Contact"}</button>
    <button title="Settings" onClick={() => navigate("/settings")}>⚙️ {isCollapsed ? "" : "Settings"}</button>
  </aside>
          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <div>
            <HeroCarousel />
          </div>
 



        {/* Welcome Section */}
<section className="px-6 sm:px-12 py-16 bg-gradient-to-br from-blue-50 to-blue-200 rounded-2xl shadow-xl mt-10 mx-4 sm:mx-8">
  <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
      Welcome to <span className="text-blue-700">Ruthenix</span>
    </h2>
    <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
      Discover a modern learning platform packed with expert-led courses in Web Development, UI/UX, and Data Science.
      <br /> Learn at your pace, track your progress, and transform your future — all in one place.
    </p>
    
    <div className="text-lg sm:text-xl font-semibold text-blue-800 mb-8">
      🎉 Join over <span className="font-bold text-blue-900">600+ happy learners</span> today!
    </div>

    <div className="flex justify-center gap-4 flex-wrap">
      <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300">
        Explore Courses
      </button>
      <button className="bg-white text-blue-700 border border-blue-700 hover:bg-blue-100 font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-300">
        Get Started
      </button>
    </div>
  </div>
</section>

<section className="py-12 bg-gray-50">
  <h3 className="text-3xl font-bold px-8 mb-8 text-gray-800 flex items-center gap-3">
    <span className="text-blue-600">🎓</span>
    Ruthenix <span className="text-green-600">Courses</span>
    <span className="text-yellow-500">✨</span>
  </h3>

  <div className="px-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {courses.slice(0, 4).map((course) => (
        <div
          key={course.id}
          className="bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden relative"
        >
          {/* Course Image */}
          <div className="relative group">
            <img
              src={course.image}
              alt={course.name}
              className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span
              className={`absolute top-3 right-3 text-white text-sm font-semibold px-3 py-1 rounded-full shadow
                ${course.price === 'Free' ? 'bg-blue-600' : 'bg-green-600'}`}
            >
              {course.price}
            </span>
          </div>

          {/* Course Info */}
          <div className="p-4">
            <h4
              className="text-base font-bold text-blue-700 mb-1 truncate"
              title={course.name}
            >
              <span className="text-green-600">Ruthenix</span> – {course.name}
            </h4>
            <p className="text-xs text-gray-500 italic mb-2">
              By {course.instructor}
            </p>

            <div className="flex items-center text-sm text-gray-500 mb-1">
              <span className="mr-2">📚 {course.category}</span>
              {course.level && (
                <span className="text-xs text-gray-400 italic ml-auto">
                  Level: {course.level}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
              <span>⭐ {course.rating}</span>
              <span>⏱ {course.duration}</span>
            </div>

            {/* Button */}
            <button
              onClick={() => navigate(`/courses/${course.id}`)}
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg transition"
            >
              View Details
            </button>
          </div>

          {/* Optional Badge (e.g., Featured) */}
          {course.badge && (
            <span className="absolute top-3 left-3 bg-yellow-400 text-xs font-bold text-white px-2 py-1 rounded shadow">
              {course.badge}
            </span>
          )}
        </div>
      ))}
    </div>

    {/* Show All Button */}
    <div className="mt-10 text-center">
      <button
        onClick={() => navigate('/courses')}
        className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold rounded-full shadow-md transition duration-300"
      >
        Show All Courses
      </button>
    </div>
  </div>
</section>



        {/* Top Categories */}
        <section className="px-8 py-10 bg-gray-100">
          <h3 className="text-2xl font-bold text-center mb-10">Explore Top Categories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Frontend Development",
                description: "React, Tailwind, Bootstrap",
                icon: "https://cdn-icons-png.flaticon.com/512/1055/1055687.png",
              },
              {
                title: "Backend & APIs",
                description: "Node.js, MongoDB, Express",
                icon: "https://cdn-icons-png.flaticon.com/512/2721/2721295.png",
              },
              {
                title: "Design & UX",
                description: "Figma, Prototyping, Wireframes",
                icon: "https://cdn-icons-png.flaticon.com/512/1907/1907567.png",
              },
              {
                title: "AI & Machine Learning",
                description: "TensorFlow, Python, ML Models",
                icon: "https://cdn-icons-png.flaticon.com/512/2721/2721278.png",
              },
            ].map((cat, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-md p-5 text-center hover:shadow-xl transition">
                <img src={cat.icon} className="w-16 h-16 mx-auto mb-4" alt={cat.title} />
                <h4 className="font-semibold mb-2">{cat.title}</h4>
                <p className="text-sm text-gray-600">{cat.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose */}
        <section className="px-8 py-12 bg-gray-50 text-center">
          <h3 className="text-2xl font-bold mb-4">Why Choose Ruthenix?</h3>
          <p className="max-w-2xl mx-auto text-gray-700">
            Ruthenix blends interactive learning, expert instructors, and real-world projects to provide you with a complete and immersive educational experience.
          </p>
        </section>

        {/* Testimonials */}
        <section className="px-8 py-16 bg-white">
          <h3 className="text-3xl font-bold text-center mb-12 text-blue-800">What Our Learners Say</h3>
          <TestimonialCarousel />
        </section>
    
<footer className="bg-gray-900 text-gray-200 px-6 md:px-16 pt-14 pb-6 mt-16">
  <div className="grid md:grid-cols-5 gap-10">
    {/* Logo and Description */}
    <div className="md:col-span-2">
      <h2 className="text-2xl font-bold text-white mb-4">Ruthenix</h2>
      <p className="text-sm text-gray-400 mb-4">
          🚀 Ruthenix is your trusted learning partner. <br />
          📚 Explore top-rated courses, 🎯 enroll easily, and 📈 grow with confidence. <br />
          💼 Join 600+ learners and unlock new career paths. 🔒 Secure, reliable, and student-first.
        </p>


      <div className="flex gap-4 mt-4">
        <a href="#" className="text-gray-400 hover:text-white transition">
          <FaFacebookF />
        </a>
        <a href="#" className="text-gray-400 hover:text-white transition">
          <FaTwitter />
        </a>
        <a href="#" className="text-gray-400 hover:text-white transition">
          <FaInstagram />
        </a>
        <a href="#" className="text-gray-400 hover:text-white transition">
          <FaLinkedinIn />
        </a>
      </div>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
      <ul className="space-y-2 text-sm">
        <li><a href="#" className="hover:text-white">Dashboard</a></li>
        <li><a href="#" className="hover:text-white">Courses</a></li>
        <li><a href="#" className="hover:text-white">Categories</a></li>
        <li><a href="#" className="hover:text-white">Blog</a></li>
      </ul>
    </div>

    {/* Support */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Support</h3>
      <ul className="space-y-2 text-sm">
        <li><a href="#" className="hover:text-white">Help Center</a></li>
        <li><a href="#" className="hover:text-white">FAQs</a></li>
        <li><a href="#" className="hover:text-white">Community</a></li>
        <li><a href="#" className="hover:text-white">Contact Us</a></li>
      </ul>
    </div>

    {/* Legal */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Legal</h3>
      <ul className="space-y-2 text-sm">
        <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
        <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
        <li><a href="#" className="hover:text-white">Refund Policy</a></li>
      </ul>
    </div>
  </div>

  {/* Bottom Line */}
  <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
    © {new Date().getFullYear()} Ruthenix. All rights reserved.
  </div>
</footer>
</div>
      </div>
    </div>
  );
};

export default Dashboard;
