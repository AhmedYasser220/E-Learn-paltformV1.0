"use client";
import { useEffect, useState } from 'react';
import Layout from "../components/layout";
import Link from 'next/link';
import { getAllCourses } from '../api/courses/route';

const CoursesPage : React.FC = () => {
 // const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
      const fetchCourses = async () => {
        try {
          const quizzesData = await getAllCourses();
          setCourses(quizzesData); // Store quizzes
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCourses();
    }, []);
  
  return (
    <Layout>
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Courses</h1>
      {loading ? (
        <p>Loading...</p>
      ) : courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <ul className="space-y-4">
          {courses.map((course: any) => (
            <li key={course._id} className="p-4 border rounded">
              <h2 className="font-bold">{course.title}</h2>
              <p>{course.description}</p>
            {/* Use Link for Edit Course navigation */}
            <Link href={`/courses/${course.course_Id}`}>
            <button className="px-4 py-2 mt-2 bg-blue-500 text-white rounded">
             Edit Course
           </button>
            </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
    </Layout>
  );
};

export default CoursesPage;




