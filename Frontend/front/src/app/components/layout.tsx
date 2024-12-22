"use client";

import React from "react";
import Link from "next/link";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col h-full py-8"> {/* Added padding */}
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
      </aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col">
        {/* Page Content */}
        <main className="flex-grow p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
