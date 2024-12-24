"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Use useParams from next/navigation
import Layout from "@/app/components/layout";

const QuizDetailPage : React.FC = () => {
  const { quiz_id } = useParams(); // Get quiz_id from the URL
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!quiz_id) return; // Ensure quiz_id exists before making API call

    const fetchQuizDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/quizzes/${quiz_id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch quiz details: ${response.status}`);
        }
        const data = await response.json();
        setQuiz(data);
      } catch (err) {
        setError("Failed to load quiz details.");
        console.error("Error fetching quiz details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizDetails();
  }, [quiz_id]); // Re-run whenever quiz_id changes

  if (loading) return <p>Loading quiz details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  if (!quiz) return <p>Quiz not found.</p>;

  return (
    <Layout>
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">{`Quiz ID: ${quiz.quiz_id}`}</h1>
      <p>{`Module ID: ${quiz.module_id}`}</p>
      <p>{`Created At: ${new Date(quiz.created_at).toLocaleDateString()}`}</p>
      <h2 className="mt-4">Questions</h2>
      <ul>
        {quiz.questions.map((question: any, index: number) => (
          <li key={index} className="border p-2 mb-4">
            <h3 className="font-bold">{question.questionText}</h3>
            <ul className="list-disc pl-5">
              {question.options.map((option: string, idx: number) => (
                <li key={idx}>{option}</li>
              ))}
            </ul>
            <p className="mt-2 font-bold text-green-500">
              Correct Answer: {question.correctAnswer}
            </p>
          </li>
        ))}
      </ul>
    </div>
    </Layout>
  );
};

export default QuizDetailPage;
