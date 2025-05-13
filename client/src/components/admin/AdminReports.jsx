import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Users, BookOpenCheck, IndianRupee } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, Legend,
} from 'recharts';

const StatCard = ({ title, value, change, bgColor, icon: Icon }) => (
  <div className={`p-6 rounded-xl text-white shadow-md hover:shadow-lg transition-all ${bgColor}`}>
    <div className="flex items-center space-x-4">
      <div className="bg-white bg-opacity-20 p-3 rounded-full">
        <Icon size={28} />
      </div>
      <div>
        <h3 className="text-base font-bold">{title}</h3>
        <p className="text-3xl font-extrabold">{value}</p>
        <p className="text-sm text-white/80">{change}</p>
      </div>
    </div>
  </div>
);

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
};

const allCourseData = {
  'Last 7 Days': [
    { name: 'Web Development', students: 120 },
    { name: 'Data Science', students: 100 },
    { name: 'UI/UX Design', students: 85 },
    { name: 'Stock Marketing', students: 90 },
    { name: 'Digital Marketing', students: 110 },
    { name: 'Business Accounting', students: 70 },
    { name: 'Software Testing', students: 50 },
    { name: 'Data Analytics', students: 95 },
  ],
  'Last 30 Days': [
    { name: 'Web Development', students: 500 },
    { name: 'Data Science', students: 450 },
    { name: 'UI/UX Design', students: 400 },
    { name: 'Stock Marketing', students: 470 },
    { name: 'Digital Marketing', students: 510 },
    { name: 'Business Accounting', students: 380 },
    { name: 'Software Testing', students: 320 },
    { name: 'Data Analytics', students: 420 },
  ],
  'Last 3 Months': [
    { name: 'Web Development', students: 1200 },
    { name: 'Data Science', students: 1050 },
    { name: 'UI/UX Design', students: 980 },
    { name: 'Stock Marketing', students: 1150 },
    { name: 'Digital Marketing', students: 1250 },
    { name: 'Business Accounting', students: 1050 },
    { name: 'Software Testing', students: 920 },
    { name: 'Data Analytics', students: 1100 },
  ],
  'This Year': [
    { name: 'Web Development', students: 7420 },
    { name: 'Data Science', students: 6350 },
    { name: 'UI/UX Design', students: 4200 },
    { name: 'Stock Marketing', students: 5980 },
    { name: 'Digital Marketing', students: 5020 },
    { name: 'Business Accounting', students: 4100 },
    { name: 'Software Testing', students: 3800 },
    { name: 'Data Analytics', students: 4600 },
  ],
};

const allUserActivityData = {
  'Last 7 Days': [
    { date: 'Mon', activeUsers: 620 },
    { date: 'Tue', activeUsers: 700 },
    { date: 'Wed', activeUsers: 780 },
    { date: 'Thu', activeUsers: 850 },
    { date: 'Fri', activeUsers: 970 },
    { date: 'Sat', activeUsers: 690 },
    { date: 'Sun', activeUsers: 500 },
  ],
  'Last 30 Days': Array.from({ length: 30 }, (_, i) => ({
    date: `Day ${i + 1}`,
    activeUsers: Math.floor(Math.random() * 1000 + 400),
  })),
  'Last 3 Months': Array.from({ length: 12 }, (_, i) => ({
    date: `Week ${i + 1}`,
    activeUsers: Math.floor(Math.random() * 1200 + 300),
  })),
  'This Year': Array.from({ length: 12 }, (_, i) => ({
    date: `Month ${i + 1}`,
    activeUsers: Math.floor(Math.random() * 2000 + 800),
  })),
};


const AdminReports = () => {
  const [selectedRange, setSelectedRange] = useState('Last 7 Days');

  const courseData = allCourseData[selectedRange];
  const userActivityData = allUserActivityData[selectedRange];

  return (
    <section className="bg-gray-100 min-h-screen p-6 md:p-10">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-3xl shadow-lg space-y-10">
        <header className="space-y-2">
          <h1 className="text-4xl font-extrabold text-gray-900">📊 Reports & Analytics</h1>
          <p className="text-md text-gray-600">
            Get a high-level overview of activity and performance on your platform.
          </p>
        </header>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Total Users"
            value="5,432"
            change="+9.4% from last month"
            bgColor="bg-gradient-to-br from-indigo-500 to-purple-600"
            icon={Users}
          />
          <StatCard
            title="Total Enrollments"
            value="12,890"
            change="+6.8% from last month"
            bgColor="bg-gradient-to-br from-emerald-500 to-green-600"
            icon={BookOpenCheck}
          />
          <StatCard
            title="Total Earnings"
            value="₹1,52,300"
            change="+11.2% from last month"
            bgColor="bg-gradient-to-br from-yellow-500 to-orange-600"
            icon={IndianRupee}
          />
        </div>

        {/* Course Performance Chart */}
        <section className="p-6 rounded-2xl border border-gray-200 bg-gray-50">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">📘 Course Performance</h3>
          <p className="text-sm text-gray-600 mb-4">
            Enrollment per course over the selected period.
          </p>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={courseData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill="#4f46e5" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* User Activity Chart */}
        <section className="p-6 rounded-2xl border border-gray-200 bg-gray-50">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">👥 User Activity</h3>
          <p className="text-sm text-gray-600 mb-4">
            Active users during the selected range.
          </p>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userActivityData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#e5e7eb" strokeDasharray="5 5" />
                <Legend />
                <Line type="monotone" dataKey="activeUsers" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Filters */}
        <section className="p-6 rounded-2xl border border-gray-200 bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="date-range" className="font-medium text-gray-700">
              Date Range:
            </label>
            <select
              id="date-range"
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 3 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:brightness-110 transition">
            Filters Applied
          </button>
        </section>
      </div>
    </section>
  );
};

export default AdminReports;
