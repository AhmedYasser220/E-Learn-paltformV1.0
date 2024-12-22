"use client";

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CourseVersionsPage = () => {
  const router = useRouter();
  const { id } = router.query; // course_Id from the URL

  const [versions, setVersions] = useState([]);

  useEffect(() => {
    if (!id) return;

    const fetchVersions = async () => {
      try {
        const response = await axios.get(`/api/courses/${id}/versions`);
        setVersions(response.data);
      } catch (error) {
        console.error('Failed to fetch course versions:', error);
      }
    };

    fetchVersions();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Course Versions</h1>
      <ul className="space-y-2">
        {versions.map((version: any, index: number) => (
          <li key={index} className="p-4 border rounded">
            <h2 className="font-bold">{version.title}</h2>
            <p>{version.description}</p>
            <p className="text-sm text-gray-500">Updated: {version.updatedAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseVersionsPage;
