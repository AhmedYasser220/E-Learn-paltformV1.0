"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

const HomePage: React.FC = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center py-4 border-b">
        <h1 className="text-2xl font-bold">E-Learning Platform</h1>
        <nav className="flex space-x-4">
          <Link href="/profile" className="px-4 py-2 text-blue-500 hover:text-blue-700">
            Profile
          </Link>
          <Link href="/login" className="px-4 py-2 text-blue-500 hover:text-blue-700">
            Login
          </Link>
        </nav>
      </header>

      <main className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Available Courses</h2>
        {loading ? (
          <p>Loading courses...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {courses.map((course: any) => (
              <div key={course._id} className="border rounded p-4 shadow-sm">
                <h3 className="font-bold text-lg">{course.title}</h3>
                <p className="text-sm text-gray-600">{course.description}</p>
                <Link
                  href={`/courses/${course._id}`}
                  className="mt-2 inline-block text-blue-500 hover:text-blue-700"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
