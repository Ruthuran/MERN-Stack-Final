import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside
        className={`transition-all duration-300 bg-gray-900 text-white flex flex-col items-center py-6 ${
          isCollapsed ? "w-20" : "w-64 px-4"
        }`}
      >
        {/* Toggle button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white mx-auto text-xl mb-6"
          title="Toggle Menu"
        >
          ☰
        </button>

        {/* Logo */}
        <div className="text-2xl font-bold mb-10">
          {isCollapsed ? "R" : "Ruthenix"}
        </div>

        {/* Navigation Buttons */}
        <nav className="flex flex-col space-y-6 w-full items-center">
          <button
            title="Dashboard"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 hover:text-blue-300"
          >
            🏠 {isCollapsed ? null : "Dashboard"}
          </button>
          <button
            title="Courses"
            onClick={() => navigate("/courses")}
            className="flex items-center gap-2 hover:text-blue-300"
          >
            📚 {isCollapsed ? null : "Courses"}
          </button>
          <button
            title="Assignments"
            onClick={() => navigate("/assignments")}
            className="flex items-center gap-2 hover:text-blue-300"
          >
            📝 {isCollapsed ? null : "Assignments"}
          </button> {/* Added Assignments */}
          <button
            title="Profile"
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 hover:text-blue-300"
          >
            👤 {isCollapsed ? null : "Profile"}
          </button>
          <button
            title="Contact"
            onClick={() => navigate("/contact")}
            className="flex items-center gap-2 hover:text-blue-300"
          >
            ✉️ {isCollapsed ? null : "Contact"}
          </button>
          <button
            title="Settings"
            onClick={() => navigate("/settings")}
            className="flex items-center gap-2 hover:text-blue-300"
          >
            ⚙️ {isCollapsed ? null : "Settings"}
          </button>
        </nav>
      </aside>

      {/* Page Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          isCollapsed ? "ml-20" : "ml-64"
        } pt-8 p-6`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
