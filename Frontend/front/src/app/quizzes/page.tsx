"use client";
import { useEffect, useState } from 'react';
import { getQuizzesByStudentEmail } from '../api/quizzes/route'; // Update to the new function for email-based fetching
import Link from 'next/link';
import Layout from '../components/layout';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [studentEmail, setStudentEmail] = useState<string | null>(null);

  // Get the student email from localStorage or from another source
  useEffect(() => {
    const studentEmailFromLocalStorage = localStorage.getItem('student_email');
    if (!studentEmailFromLocalStorage) {
      setError('No user logged in');
      return;
    }
    setStudentEmail(studentEmailFromLocalStorage);
  }, []);

  useEffect(() => {
    if (studentEmail) {
      const fetchQuizzes = async () => {
        try {
          const data = await getQuizzesByStudentEmail(studentEmail); // Pass studentEmail dynamically
          setQuizzes(data);
        } catch (err) {
          setError('Failed to load quizzes.');
        }
      };
      fetchQuizzes();
    }
  }, [studentEmail]);

  if (error) return <p>{error}</p>;

  return (
    <Layout>
      <div>
        <h1>All Quizzes</h1>
        {quizzes.length > 0 ? (
          <ul>
            {quizzes.map((quiz) => (
              <li key={quiz.quiz_id}>
                <Link href={`/quiz/${quiz.quiz_id}`}>{`Quiz ID: ${quiz.quiz_id}, Module ID: ${quiz.module_id}`}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No quizzes available for your modules.</p>
        )}
      </div>
    </Layout>
  );
};

export default QuizList;
