"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Courses</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {courses.map((course: any) => (
            <li key={course._id} className="p-4 border rounded">
              <h2 className="font-bold">{course.title}</h2>
              <p>{course.description}</p>
              <Link href={`/courses/${course._id}/edit`} className="text-blue-500">
                Edit Course
              </Link>
              <br />
              <Link href={`/courses/${course._id}/versions`} className="text-blue-500">
                View Versions
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CoursesPage;
