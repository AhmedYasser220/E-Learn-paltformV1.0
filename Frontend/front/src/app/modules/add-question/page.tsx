"use client";

import { useState } from 'react';
import axios from 'axios';

const AddQuestionPage = () => {
  const [formData, setFormData] = useState({
    question: '',
    difficulty: 'easy', // Default value
    type: 'MCQ', // Default value
    module: '',
    answer: '',
  });
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      const response = await axios.post('/api/modules/add-question', formData);
      setSuccess('Question added successfully');
      setFormData({
        question: '',
        difficulty: 'easy',
        type: 'MCQ',
        module: '',
        answer: '',
      }); // Reset form fields after success
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to add question');
      } else {
        setError('An unexpected error occurred');
      }
      setSuccess(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Add a Question</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Question</label>
          <input
            type="text"
            name="question"
            value={formData.question}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Difficulty</label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="MCQ">MCQ</option>
            <option value="True/False">True/False</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold">Module</label>
          <input
            type="text"
            name="module"
            value={formData.module}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Answer</label>
          <input
            type="text"
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Add Question
        </button>
        {success && <p className="text-green-500">{success}</p>}
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default AddQuestionPage;
