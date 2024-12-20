"use client";

import { useEffect, useState } from 'react';
import { fetchAllQuizzes } from '../api/quizzes';
import Link from 'next/link';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await fetchAllQuizzes();
        setQuizzes(data);
      } catch (err) {
        setError('Failed to load quizzes.');
      }
    };
    fetchQuizzes();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>All Quizzes</h1>
      {quizzes.length > 0 ? (
        <ul>
          {quizzes.map((quiz) => (
            <li key={quiz.id}>
              <Link href={`/quiz/${quiz.id}`}>{`Quiz ID: ${quiz.id}, Module ID: ${quiz.module_id}`}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No quizzes available.</p>
      )}
    </div>
  );
};

export default QuizList;
