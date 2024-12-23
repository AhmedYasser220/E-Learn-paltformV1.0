// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Layout from "../components/layout"; // Assuming this is the same layout component
// import { Quiz } from "../api/quizzes/route"; // Import the Quiz type

// const QuizListPage : React.FC = () => {
//   const [quizzes, setQuizzes] = useState<Quiz[]>([]);
//   const [error, setError] = useState<string>("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       try {
//         console.log('Fetching quizzes...');
//         const response = await fetch('http://localhost:4000/quizzes/quizzes');
        
//         if (!response.ok) {
//           console.log('Failed Response Status:', response.status);
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         const data = await response.json();
//         console.log('API Response:', data); // Log the response data
//         setQuizzes(data); // Store quizzes
//       } catch (err) {
//         console.error('Failed to fetch quizzes:', err);
//         setError('Failed to fetch quizzes');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuizzes();
//   }, []);

//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <Layout>
//       <div className="container mx-auto p-4">
//         <h1 className="text-xl font-bold mb-4">Available Quizzes</h1>
//         {loading ? (
//           <p>Loading...</p>
//         ) : quizzes.length === 0 ? (
//           <p>No quizzes available.</p>
//         ) : (
//           <ul className="space-y-4">
//             {quizzes.map((quiz) => (
              
//               <li key={quiz.quiz_id} className="p-4 border rounded shadow-lg">
//                 <Link href={`/quizzes/${quiz.quiz_id}`}>
//                   <div className="block">
//                     <h2 className="font-bold">{`Quiz ID: ${quiz.quiz_id}`}</h2>
//                   </div>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default QuizListPage;


"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../components/layout";
import { Quiz } from "../api/quizzes/route";
import { createQuiz } from "../api/quizzes/route"; // Import createQuiz function for API call

const QuizListPage: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // State for creating a quiz
  const [moduleId, setModuleId] = useState("");
  const [userPerformance, setUserPerformance] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [questionTypes, setQuestionTypes] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        console.log("Fetching quizzes...");
        const response = await fetch("http://localhost:4000/quizzes/quizzes");

        if (!response.ok) {
          console.log("Failed Response Status:", response.status);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data); // Log the response data
        setQuizzes(data); // Store quizzes
      } catch (err) {
        console.error("Failed to fetch quizzes:", err);
        setError("Failed to fetch quizzes");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  // Handle quiz creation form submission
  const handleCreateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newQuiz = {
        module_id: moduleId,
        userPerformance,
        questionCount,
        questionTypes: questionTypes.split(",").map((type) => type.trim()),
      };

      await createQuiz(newQuiz); // Call API to create quiz
      setSuccess("Quiz created successfully!");
      setError("");
      setModuleId("");
      setUserPerformance(0);
      setQuestionCount(0);
      setQuestionTypes("");

      // Fetch the updated list of quizzes after creating a new one
      const response = await fetch("http://localhost:4000/quizzes/quizzes");
      const data = await response.json();
      setQuizzes(data); // Update the list of quizzes
    } catch (err) {
      setError("Failed to create quiz.");
      setSuccess("");
    }
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-bold mb-4">Available Quizzes</h1>

        {/* Display success message */}
        {success && <p style={{ color: "green" }}>{success}</p>}

        {loading ? (
          <p>Loading...</p>
        ) : quizzes.length === 0 ? (
          <p>No quizzes available.</p>
        ) : (
          <ul className="space-y-4">
            {quizzes.map((quiz) => (
              <li key={quiz.quiz_id} className="p-4 border rounded shadow-lg">
                <Link href={`/quizzes/${quiz.quiz_id}`}>
                  <div className="block">
                    <h2 className="font-bold">{`Quiz ID: ${quiz.quiz_id}`}</h2>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* Create Quiz Form */}
        <div className="mt-8">
          <h2 className="text-xl font-bold">Create a New Quiz</h2>
          <form onSubmit={handleCreateQuiz}>
            <div className="mb-4">
              <label className="block">Module ID:</label>
              <input
                type="text"
                value={moduleId}
                onChange={(e) => setModuleId(e.target.value)}
                className="border p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block"> Student Performance:</label>
              <input
                type="number"
                value={userPerformance}
                onChange={(e) => setUserPerformance(Number(e.target.value))}
                className="border p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block">Question Count:</label>
              <input
                type="number"
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="border p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block">Question Types (comma-separated):</label>
              <input
                type="text"
                value={questionTypes}
                onChange={(e) => setQuestionTypes(e.target.value)}
                className="border p-2"
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              Create Quiz
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default QuizListPage;
