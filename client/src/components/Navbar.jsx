import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import UserDropdown from "./UserDropdown";

const Navbar = () => {
  const { user } = useAuth() || {}; // Default to an empty object if useAuth() is undefined
  const navigate = useNavigate();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const instituteName = "Ruthenix";
  const instituteLogo = "https://www.shutterstock.com/image-vector/letter-r-education-logo-design-260nw-2433614341.jpg";

  const displayName = user?.name || "Guest";
  const profileImage = user?.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const toggleSidebarVisibility = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const sidebarLinks = [
    { label: "🏠 Dashboard", path: "/" },
    { label: "📚 Courses", path: "/courses" },
    { label: "👤 Profile", path: "/profile" },
    { label: "✉️ Contact", path: "/contact" },
    { label: "⚙️ Settings", path: "/settings" },
  ];

  return (
    <div>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 text-gray-200 px-4 sm:px-6 py-2 h-16 flex items-center justify-between shadow-md">
        {/* Logo & Name */}
        <div className="flex items-center gap-4">
          <button
            className="text-2xl text-gray-300 md:hidden"
            onClick={toggleSidebarVisibility}
            aria-label="Toggle sidebar"
          >
            <FaBars />
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white">
            <img
              src={instituteLogo}
              alt="Ruthenix Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-lg sm:text-xl font-bold">{instituteName}</h1>
        </div>

        {/* Auth Links */}
        <div className="relative flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm hidden sm:block">Hi, {displayName}</span>
              <UserDropdown profileImage={profileImage} navigate={navigate} />
            </>
          ) : (
            <div className="space-x-2 sm:space-x-3 text-sm">
              <Link
                to="/login"
                className="px-3 sm:px-4 py-1.5 border border-blue-400 text-blue-400 rounded hover:bg-blue-500 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-3 sm:px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Sidebar */}
      {isSidebarVisible && (
        <div className="fixed top-16 left-0 w-full bg-gray-800 text-gray-200 shadow-lg z-40">
          <div className="flex flex-col items-start p-4 space-y-3">
            {user ? (
              sidebarLinks.map(({ label, path }) => (
                <button
                  key={path}
                  onClick={() => {
                    navigate(path);
                    setIsSidebarVisible(false); // Close sidebar on nav
                  }}
                  className="hover:text-blue-400 transition text-left"
                >
                  {label}
                </button>
              ))
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-400 transition">
                  Login
                </Link>
                <Link to="/signup" className="hover:text-blue-400 transition">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};


export default Navbar;
