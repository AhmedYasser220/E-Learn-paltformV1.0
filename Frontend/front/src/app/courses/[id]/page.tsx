"use client"; // Add this line to mark the file as a client component

import { useState } from 'react';
import { updateCourse } from '../../api/courses/route';
import { useParams } from 'next/navigation'
import Layout from "../../components/layout";

const UpdateCoursePage = () => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty_level, setDifficultyLevel] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  console.log("params", id)
  const courseId = typeof id === 'string' ? id : '';
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const updateData = {
      title,
      description,
      category,
      difficulty_level,
    };
    try {
      const response = await updateCourse(courseId, updateData);
      console.log('Updated course:', response);
    } catch (err: any) {
      setError(err.message || 'Failed to update course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
    <div>
      <h1>Update Course</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Description</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Category</label>
          <input 
            type="text" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            required 
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Difficulty Level</label>
          <input 
            type="text" 
            value={difficulty_level} 
            onChange={(e) => setDifficultyLevel(e.target.value)} 
            required 
            className="w-full p-2 border rounded"
          />
        </div>
        <button 
          type="submit" 
          disabled={loading} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          {loading ? 'Updating...' : 'Update Course'}
        </button>
      </form>
    </div>
    </Layout>
  );
};

export default UpdateCoursePage;

