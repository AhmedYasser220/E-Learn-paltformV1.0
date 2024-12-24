"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../components/layout";
import { getAllQuizzes, Quiz } from "../api/quizzes/route";

const QuizListPage: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const quizzesData = await getAllQuizzes();
        setQuizzes(quizzesData); // Store quizzes
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-bold mb-4">Available Quizzes</h1>
        {quizzes.length === 0 ? (
          <p>No quizzes available.</p>
        ) : (
          <ul className="space-y-4">
            {quizzes.map((quiz) => (
              <li key={quiz.quiz_id} className="p-4 border rounded shadow-lg">
                <h2 className="font-bold">{`Quiz ID: ${quiz.quiz_id}`}</h2>
                <Link href={`/quizzes/${quiz.quiz_id}`}>
                  <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                    View Quiz
                  </button>
                </Link>
                <Link href="/quizzes/create-quiz">
                    <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded">
                      Create Quiz
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

export default QuizListPage;

 