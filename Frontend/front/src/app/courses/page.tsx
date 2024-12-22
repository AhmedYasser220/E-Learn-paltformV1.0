"use client";
import { useEffect, useState } from 'react';
import Layout from "../components/layout";

const CoursesPage : React.FC = () => {
 // const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        console.log('Fetching courses...');
        const response = await fetch('/api/courses');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API Response:', data); // Check the API response
        setCourses(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
        setCourses([]); // Handle errors gracefully
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
             {/* Only use router.push after ensuring client-side rendering */}
             <button
              //  onClick={() => router.push(`/courses/${course._id}/edit`)}
                className="px-4 py-2 mt-2 bg-blue-500 text-white rounded"
              >
                Edit Course
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
    </Layout>
  );
};

export default CoursesPage;



