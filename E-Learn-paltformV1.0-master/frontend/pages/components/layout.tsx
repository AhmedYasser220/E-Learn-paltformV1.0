import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as Icons from 'lucide-react';
import { Menu, X } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  const navItems = [
    { path: '/home', label: 'Home', icon: Icons.Home },
    { path: '/profile', label: 'Profile', icon: Icons.User },
    { path: '/backup', label: 'Backup', icon: Icons.Archive },
    { path: '/forum', label: 'Forum', icon: Icons.MessageSquare },
    { path: '/login', label: 'Login', icon: Icons.LogIn },
    { path: '/auth/register', label: 'Register', icon: Icons.UserPlus }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Mobile Nav Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-indigo-600 rounded-md"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X className="text-white" /> : <Menu className="text-white" />}
      </button>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-64 transform transition-transform duration-200 ease-in-out shadow-lg
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            MyApp
          </h1>
        </div>
        
        <nav className="mt-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center px-6 py-3 text-gray-300 hover:bg-indigo-600 hover:text-white transition-colors duration-200
                  ${router.pathname === item.path ? 'bg-indigo-700 text-white' : ''}`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-200 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
        <div className="min-h-screen p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
