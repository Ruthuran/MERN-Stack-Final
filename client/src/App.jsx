import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 🌐 Public Components
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';
import Assignments from './components/Assignments';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import MentorLogin from './Pages/MentorLogin';
import Contact from './Pages/Contact';
import Profile from './Pages/Profile';
import Settings from './Pages/Settings';
import SearchResults from './components/SearchResults';
import Payment from './components/Payment';
import MentorSignup from './Pages/MentorSignup';

// 🔐 Authentication & Protected Route
import PrivateRoute from './components/PrivateRoute';
import ProtectedLayout from './components/ProtectedLayout';

// 🎓 Mentor Components
import MentorLayout from './components/mentor/MentorLayout';
import MentorDashboard from './components/mentor/MentorDashboard';
import MentorCourses from './components/mentor/MentorCourses';
import MentorStudents from './components/mentor/MentorStudents';

// 🛠️ Admin Components
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminCourses from './components/admin/AdminCourses';
import AdminReports from './components/admin/AdminReports';
import AdminMentors from './components/admin/AdminMentors';

// ❌ Not Found Page
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="text-center text-xl font-semibold mt-10">
    Page Not Found
    <div className="mt-4">
      <Link to="/" className="text-blue-600">Go to Homepage</Link>
    </div>
  </div>
);

const App = () => {
  return (
    <>
      <Navbar />
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="pt-16">
        <Routes>
          {/* 🌐 Public Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mentor-login" element={<MentorLogin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/mentor" element={<MentorSignup />} />
          <Route path="/payment" element={<Payment />} />

          {/* 🔐 Auth Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* 🎓 Mentor Protected Routes */}
          <Route element={<PrivateRoute allowedRoles={['mentor']} />}>
            <Route path="/mentor" element={<MentorLayout />}>
              <Route path="dashboard" element={<MentorDashboard />} />
              <Route path="courses" element={<MentorCourses />} />
              <Route path="students" element={<MentorStudents />} />
            </Route>
          </Route>

          {/* 🛠️ Admin Protected Routes */}
          <Route element={<PrivateRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="mentors" element={<AdminMentors />} />
            </Route>
          </Route>

          {/* 🚧 Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
