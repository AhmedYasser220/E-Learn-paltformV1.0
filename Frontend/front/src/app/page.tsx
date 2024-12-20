"use client";

import React from "react";
import Link from "next/link";

const HomePage: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <nav className="flex-grow">
          <ul className="space-y-2 p-4">
            <li>
              <Link href="/" className="block p-2 hover:bg-gray-700 rounded">
                Home
              </Link>
            </li>
            <li>
              <Link href="/courses" className="block p-2 hover:bg-gray-700 rounded">
                Courses
              </Link>
            </li>
            <li>
              <Link href="/quizzes" className="block p-2 hover:bg-gray-700 rounded">
                Quizzes
              </Link>
            </li>
            <li>
              <Link href="/modules" className="block p-2 hover:bg-gray-700 rounded">
                Modules
              </Link>
            </li>
            <li>
              <Link href="/logout" className="block p-2 hover:bg-gray-700 rounded">
                Logout
              </Link>
            </li>
          </ul>
        </nav>
        {/* Dashboard Section */}
        <div className="p-4 mt-auto bg-gray-700 text-center">
          <h2 className="text-xl font-bold">Dashboard</h2>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col">
        {/* Top Navbar */}
        <header className="flex justify-between items-center p-4 bg-gray-100 border-b">
          <h1 className="text-2xl font-bold">E-Learning Platform</h1>
        </header>

        {/* Page Content */}
      </div>
    </div>
  );
};

export default HomePage;