"use client";

import { useState } from 'react';
import { createQuiz } from '../api/quizzes/route';

const CreateQuiz = () => {
  const [moduleId, setModuleId] = useState('');
  const [userPerformance, setUserPerformance] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [questionTypes, setQuestionTypes] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createQuiz({
        module_id: moduleId,
        userPerformance,
        questionCount,
        questionTypes: questionTypes.split(','),
      });
      setSuccess('Quiz created successfully!');
      setError('');
    } catch (err) {
      setError('Failed to create quiz.');
    }
  };

  return (
    <div>
      <h1>Create a Quiz</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Module ID:</label>
          <input
            type="text"
            value={moduleId}
            onChange={(e) => setModuleId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>User Performance:</label>
          <input
            type="number"
            value={userPerformance}
            onChange={(e) => setUserPerformance(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Question Count:</label>
          <input
            type="number"
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Question Types (comma-separated):</label>
          <input
            type="text"
            value={questionTypes}
            onChange={(e) => setQuestionTypes(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Quiz</button>
      </form>
    </div>
  );
};

export default CreateQuiz;
