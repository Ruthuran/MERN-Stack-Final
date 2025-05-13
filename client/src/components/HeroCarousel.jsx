import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import hero1 from "../assets/hero1.jpeg";
import hero2 from "../assets/hero2.jpeg";
import hero3 from "../assets/Hero3.jpg";
import { toast } from "react-hot-toast";

const slides = [
  {
    image: hero1,
    title: "Unlock Your Potential with",
    highlight: "Ruthenix 🚀",
    description:
      "Master in-demand skills, access expert-curated content, and join our thriving community.",
    alignment: "left",
  },
  {
    image: hero2,
    title: "Learn Anytime, Anywhere with",
    highlight: "Interactive Courses 🎯",
    description:
      "Flexible learning paths and personalized dashboards for every learner.",
    alignment: "right",
  },
  {
    image: hero3,
    title: "Be Part of a Thriving Community",
    highlight: "600+ Learners & Growing 📚",
    description:
      "Join Ruthenix and connect with passionate learners, gain real-world skills, and accelerate your career journey.",
    alignment: "left",
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleExplore = () => {
    navigate("/courses");
  };

  const handleJoinNow = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/signup");
    } else if (user.role === "Student") {
      // Show card and redirect after delay
      setShowCard(true);
      setTimeout(() => {
        setShowCard(false);
        navigate("/courses");
      }, 3000);
    } else {
      toast.error("This action is only available for Students.");
    }
  };

  const { image, title, highlight, description, alignment } = slides[index];

  return (
    <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden transition-all duration-700">
      <img
        src={image}
        alt="Hero Banner"
        className="absolute inset-0 w-full h-full object-cover object-top z-0 transition-opacity duration-1000 ease-in-out"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/20 z-10" />

      <div
        className={`relative z-20 max-w-7xl mx-auto px-6 py-8 w-full flex items-center ${
          alignment === "right" ? "justify-end text-right" : "justify-start text-left"
        }`}
      >
        <div className="text-white max-w-2xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-4 drop-shadow-lg">
            {title} <br />
            <span className="text-yellow-300">{highlight}</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg mb-6 text-white/90">
            {description}
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-4 ${
              alignment === "right" ? "justify-end" : "justify-start"
            }`}
          >
            <button
              onClick={handleExplore}
              className="bg-yellow-400 text-black px-5 py-2.5 rounded-full text-base font-semibold hover:bg-yellow-300 shadow-lg transition"
            >
              Explore Courses
            </button>
            <button
              onClick={handleJoinNow}
              className="bg-white text-indigo-600 px-5 py-2.5 rounded-full text-base font-semibold hover:bg-gray-100 shadow-lg transition"
            >
              Join Now
            </button>
          </div>
        </div>
      </div>

      {/* Slide Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 w-6 rounded-full transition-all duration-300 ${
              index === i ? "bg-yellow-400 scale-110" : "bg-white/50"
            }`}
          ></button>
        ))}
      </div>

      {/* Student Logged-In Card */}
      {showCard && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50 bg-white text-black px-6 py-4 rounded-xl shadow-xl text-center max-w-md w-full animate-fade-in-up">
          <h2 className="text-lg font-semibold mb-2">You’ve already joined us! 🎉</h2>
          <p className="text-sm">
            Here’s the <span className="font-semibold">Explore Courses</span> section. Happy Learning!
          </p>
        </div>
      )}
    </section>
  );
}
