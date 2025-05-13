import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Navbar from '../Navbar';

const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside
        className={`transition-all duration-300 bg-gray-900 text-white flex flex-col items-center py-6 space-y-6 ${
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

        {/* Logo or Brand */}
        <div className="text-2xl font-bold">
          {isCollapsed ? 'R' : 'Ruthenix'}
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-4 w-full items-center">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md w-full hover:bg-gray-700 justify-center ${
                isActive ? 'bg-gray-700' : ''
              }`
            }
          >
            📊 {isCollapsed ? null : <span>Dashboard</span>}
          </NavLink>

          {/* Manage Mentors Link */}
          <NavLink
            to="/admin/mentors" // Updated to link to the Manage Mentors page
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md w-full hover:bg-gray-700 justify-center ${
                isActive ? 'bg-gray-700' : ''
              }`
            }
          >
            👥 {isCollapsed ? null : <span>Manage Mentors</span>}
          </NavLink>

          <NavLink
            to="/admin/courses"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md w-full hover:bg-gray-700 justify-center ${
                isActive ? 'bg-gray-700' : ''
              }`
            }
          >
            📚 {isCollapsed ? null : <span>Manage Courses</span>}
          </NavLink>

          <NavLink
            to="/admin/reports"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md w-full hover:bg-gray-700 justify-center ${
                isActive ? 'bg-gray-700' : ''
              }`
            }
          >
            📈 {isCollapsed ? null : <span>Reports</span>}
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1">
        <Navbar />
        <main className="pt-16 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
