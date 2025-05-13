import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const MentorLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const navLinkClass = (path) =>
    `flex items-center gap-3 px-3 py-2 rounded-md w-full hover:bg-blue-700 justify-center ${
      location.pathname === path ? 'bg-blue-700' : ''
    }`;

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside
        className={`transition-all duration-300 bg-blue-800 text-white flex flex-col items-center py-6 space-y-6 ${
          isCollapsed ? 'w-20' : 'w-64 px-4'
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white mx-auto text-xl"
          title="Toggle Menu"
        >
          ☰
        </button>

        {/* Logo */}
        <div className="text-2xl font-bold">
          {isCollapsed ? 'R' : 'Ruthenix'}
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-4 w-full items-center">
          <Link to="/mentor/dashboard" className={navLinkClass('/mentor/dashboard')}>
            📊 {isCollapsed ? null : <span>Dashboard</span>}
          </Link>

          <Link to="/mentor/courses" className={navLinkClass('/mentor/courses')}>
            🎓 {isCollapsed ? null : <span>My Courses</span>}
          </Link>

          <Link to="/mentor/students" className={navLinkClass('/mentor/students')}>
            👨‍🏫 {isCollapsed ? null : <span>Students</span>}
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {children || <Outlet />}
      </main>
    </div>
  );
};

export default MentorLayout;
