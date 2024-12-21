"use client";

import { useParams } from "next/navigation"; // Correct hook for App Router
import { useEffect, useState } from "react";
import { getQuizById } from "../api/quizzes/route";

const QuizDetail = () => {
  const { quiz_id } = useParams(); // Fetch the dynamic route parameter
  const [quiz, setQuiz] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (quiz_id) {
      const fetchQuiz = async () => {
        try {
          const quizData = await getQuizById(quiz_id as string); // Cast if needed
          setQuiz(quizData);
        } catch (err) {
          setError("Quiz not found");
        }
      };
      fetchQuiz();
    }
  }, [quiz_id]);

  if (error) return <p>{error}</p>;
  if (!quiz) return <p>Loading...</p>;

  return (
    <div>
      <h1>Quiz Detail</h1>
      <p>Module ID: {quiz.module_id}</p>
      <p>User Performance: {quiz.userPerformance}</p>
      <p>Question Count: {quiz.questionCount}</p>
      <p>Question Types: {quiz.questionTypes.join(", ")}</p>
    </div>
  );
};

export default QuizDetail;
