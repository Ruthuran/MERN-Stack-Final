import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import {
  User as UserIcon,
  Settings,
  LogOut,
  BadgeCheck
} from "lucide-react"; // Install lucide-react if not already

const UserDropdown = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  const handleToggle = () => setOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <img
        src={
          user.avatar ||
          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
        }
        alt="User Avatar"
        title="Account"
        onClick={handleToggle}
        className="w-10 h-10 rounded-full border-2 border-blue-500 cursor-pointer object-cover transition hover:scale-105 hover:shadow-lg duration-300 ease-in-out"
      />

      {open && (
        <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 z-50 transform transition-all origin-top-right scale-95 opacity-0 animate-dropdown">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <p className="text-base font-bold">{user.name || "User"}</p>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate">
              {user.email}
            </p>
            <div className="mt-2 flex items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400">
              <BadgeCheck size={16} />
              {user.role || "Student"}
            </div>
          </div>

          <button
            onClick={() => handleNavigate("/profile")}
            className="flex items-center w-full px-4 py-2 gap-2 text-sm hover:bg-blue-50 dark:hover:bg-gray-800 transition"
          >
            <UserIcon size={18} /> My Profile
          </button>

          <button
            onClick={() => handleNavigate("/settings")}
            className="flex items-center w-full px-4 py-2 gap-2 text-sm hover:bg-blue-50 dark:hover:bg-gray-800 transition"
          >
            <Settings size={18} /> Settings
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 gap-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-800 hover:text-red-700 dark:hover:text-red-300 transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      )}

      {/* Custom animation class */}
      <style>{`
        .animate-dropdown {
          animation: dropdown 0.2s ease forwards;
        }

        @keyframes dropdown {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default UserDropdown;
