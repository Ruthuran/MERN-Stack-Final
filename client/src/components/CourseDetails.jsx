import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaRegClock, FaUserGraduate, FaFilePdf, FaVideo } from 'react-icons/fa';
import { toast } from 'react-toastify';

// Course images
import course1 from '../assets/course1.jpg';
import course2 from '../assets/course2.jpg';
import course3 from '../assets/course3.jpg';
import course4 from '../assets/course4.png';
import course5 from '../assets/course5.jpg';
import course6 from '../assets/course6.jpg';
import course7 from '../assets/course7.jpg';
import course8 from '../assets/course8.jpg';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPreview, setSelectedPreview] = useState(null);
  const [enrolled, setEnrolled] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const studentId = user?._id;

  const courseImages = {
    "🌐 Web Development Bootcamp": course1,
    "📊 Data Science Masterclass": course2,
    "🎨 UI/UX Design Essentials": course3,
    "📈 Stock Marketing Fundamentals": course4,
    "📢 Digital Marketing Pro": course5,
    "📚 Business Accounting Basics": course6,
    "🔍 Software Testing Foundations": course7,
    "📊 Data Analytics with Excel & Power BI": course8,
  };

 const handlePreview = (type, url) => {
  if (type === 'video') {
    const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
    if (isYouTube) {
      let videoId = '';
      if (url.includes('youtu.be')) {
        videoId = url.split('youtu.be/')[1];
      } else {
        const urlParams = new URLSearchParams(new URL(url).search);
        videoId = urlParams.get('v');
      }
      url = `https://www.youtube.com/embed/${videoId}`;
    }
  }
  setSelectedPreview({ type, url });
};


  useEffect(() => {
    const fetchCourseAndCheckEnrollment = async () => {
      try {
        const courseRes = await fetch(`http://localhost:5000/api/courses/${id}`);
        const courseData = await courseRes.json();
        setCourse(courseData);

        if (studentId) {
          const enrollRes = await fetch(`http://localhost:5000/api/enrollments/student/${studentId}`);
          const enrollData = await enrollRes.json();
          if (Array.isArray(enrollData)) {
            const isEnrolled = enrollData.some(e => e.course === id || e.name === courseData.name);
            setEnrolled(isEnrolled);
          } else {
            setEnrolled(false);
          }
        }
      } catch (err) {
        setError('Failed to fetch course or enrollment status.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseAndCheckEnrollment();
  }, [id, studentId]);

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error) return <div className="text-center p-10 text-red-600">Error: {error}</div>;
  if (!course) return <div className="text-center p-10">Course not found</div>;

  const courseImage = courseImages[course.name] || 'https://via.placeholder.com/400x250';

  return (
    <div className="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 font-sans text-[1.05rem]">
      <div className="p-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-indigo-600 hover:text-white hover:bg-gradient-to-tr from-indigo-500 to-purple-600 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 dark:text-indigo-400 dark:hover:text-white transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Banner */}
        <div className="w-full lg:w-2/3 relative h-[34rem] overflow-hidden rounded-xl">
          <img
            src={courseImage}
            alt={course.name}
            className="w-full h-full object-cover"
            onError={(e) => (e.target.src = 'https://via.placeholder.com/400x250')}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white drop-shadow-lg">
            <h2 className="text-5xl font-bold">{course.name}</h2>
            <p className="text-xl">{course.tagline}</p>
          </div>
        </div>

        {/* Syllabus */}
        <div className="w-full lg:w-1/3 p-6 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 h-[34rem] overflow-y-auto rounded-xl shadow-lg">
          <h3 className="text-3xl font-semibold mb-6 flex items-center gap-3">
            <span className="text-green-500">📚</span> Syllabus
          </h3>
          <div className="space-y-6">
            {course.syllabus?.length ? course.syllabus.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white dark:bg-gray-700 rounded-3xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 group"
              >
                <div className="flex items-center gap-3 text-green-600 font-medium text-xl">
                  <FaRegClock className="text-lg group-hover:text-green-700" />
                  <span className="group-hover:text-green-700">{item.name}</span>
                </div>
                <div className="flex gap-4">
                  {item.pdf && (
                    <button
                      onClick={() => handlePreview('pdf', item.pdf)}
                      className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full transition hover:bg-blue-100 hover:scale-105"
                    >
                      <FaFilePdf className="text-lg" />
                      <span className="text-sm">PDF</span>
                    </button>
                  )}
                  {item.video && (
                    <button
                      onClick={() => handlePreview('video', item.video)}
                      className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full transition hover:bg-red-100 hover:scale-105"
                    >
                      <FaVideo className="text-lg" />
                      <span className="text-sm">Video</span>
                    </button>
                  )}
                </div>
              </div>
            )) : (
              <p className="text-gray-500 italic text-center">No syllabus available.</p>
            )}
          </div>
        </div>
      </div>

    {/* Preview Section */}
{selectedPreview && (
  <div className="px-4 sm:px-6 py-6">
    <h4 className="text-2xl font-semibold mb-4">📽️ Preview</h4>
    <div className="relative w-full h-[500px] border rounded-xl overflow-hidden bg-black">
      {selectedPreview.type === 'pdf' ? (
        <iframe
          src={selectedPreview.url}
          className="w-full h-full"
          title="PDF Preview"
        />
      ) : selectedPreview.url.includes("youtube.com/embed") ? (
        <iframe
          src={selectedPreview.url}
          className="w-full h-full"
          title="YouTube Video Preview"
          allowFullScreen
        />
      ) : (
        <video
          src={selectedPreview.url}
          controls
          className="w-full h-full object-cover"
        />
      )}
      <button
        onClick={() => setSelectedPreview(null)}
        className="absolute top-2 right-2 bg-white hover:bg-red-500 hover:text-white text-red-600 font-bold px-3 py-1 rounded"
      >
        ✖ Close
      </button>
    </div>
  </div>
)}

      {/* Course Overview */}
      <div className="px-4 sm:px-6 py-6 border-b dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <div>
            <p>👨‍🏫 Instructor: <span className="font-semibold">{course.instructor}</span></p>
            <p>🏷️ Brand: <span className="font-semibold">Ruthenix</span></p>
            <p className="flex items-center text-yellow-500"><FaStar /> <span className="ml-1">{course.rating}</span></p>
          </div>
          <div className="flex gap-4 text-gray-600 dark:text-gray-300">
            <p className="flex items-center"><FaUserGraduate className="mr-1" /> {course.students}</p>
            <p className="flex items-center"><FaRegClock className="mr-1" /> {course.duration} hrs</p>
            <p className="text-green-600 font-bold">{course.price}</p>
          </div>
        </div>
      </div>

      {/* Learning & Payment */}
      <div className="px-4 sm:px-6 py-8 grid lg:grid-cols-2 gap-8">
        <div>
          <h4 className="text-2xl font-semibold mb-4">🧠 What You'll Learn</h4>
          <ul className="list-disc list-inside space-y-2">
            {course.learningOutcomes?.map((outcome, i) => (
              <li key={i}><FaRegClock className="inline mr-2 text-green-500" />{outcome}</li>
            ))}
          </ul>
          <h4 className="text-2xl font-semibold mt-6 mb-4">🔧 Requirements</h4>
          <ul className="list-disc list-inside space-y-2">
            {course.requirements?.map((req, i) => (
              <li key={i}><FaRegClock className="inline mr-2 text-indigo-500" />{req}</li>
            ))}
          </ul>
        </div>

        {!enrolled && (
          <div className="border rounded-lg shadow p-6 bg-white dark:bg-gray-800">
            <h4 className="text-xl font-semibold mb-4">🎯 Get Started Today</h4>
            <p className="text-3xl font-bold text-green-600">{course.discountedPrice}</p>
            <p className="line-through text-gray-500 dark:text-gray-400">{course.originalPrice}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">⏳ Limited-time offer</p>
            <button
              onClick={() =>
                navigate('/payment', {
                  state: {
                    course: {
                      name: course.name,
                      instructor: course.instructor,
                      amount: course.discountedPrice,
                    },
                  },
                })
              }
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300"
            >
              Enroll Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
