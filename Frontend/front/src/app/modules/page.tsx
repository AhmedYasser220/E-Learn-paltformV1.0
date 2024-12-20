"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

const ModulesPage = () => {
  // States for CheckModuleAccess
  const { module_id } = useParams();
  const [performance, setPerformance] = useState<number | undefined>();
  const [accessResult, setAccessResult] = useState<string | null>(null);
  const [accessError, setAccessError] = useState<string | null>(null);

  // States for AddQuestion
  const [questionForm, setQuestionForm] = useState({
    question: "",
    difficulty: "easy",
    type: "MCQ",
    module: "",
    answer: "",
  });
  const [addQuestionSuccess, setAddQuestionSuccess] = useState<string | null>(null);
  const [addQuestionError, setAddQuestionError] = useState<string | null>(null);

  // States for AvailableModules
  const [modules, setModules] = useState<any[]>([]);
  const [modulesError, setModulesError] = useState<string | null>(null);

  // Handle CheckModuleAccess
  const handleCheckAccess = async () => {
    try {
      setAccessError(null);
      const response = await axios.get(`/api/modules/access/${module_id}`, {
        params: { studentPerformance: performance },
      });
      setAccessResult(response.data.message);
    } catch (err) {
      if (err instanceof Error) {
        setAccessError(err.message || "Failed to check access");
      } else {
        setAccessError("An unexpected error occurred");
      }
      setAccessResult(null);
    }
  };

  // Handle AddQuestion
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setQuestionForm({ ...questionForm, [name]: value });
  };

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setAddQuestionError(null);
      await axios.post("/api/modules/add-question", questionForm);
      setAddQuestionSuccess("Question added successfully!");
      setQuestionForm({
        question: "",
        difficulty: "easy",
        type: "MCQ",
        module: "",
        answer: "",
      });
    } catch (err) {
      if (err instanceof Error) {
        setAddQuestionError(err.message || "Failed to add question");
      } else {
        setAddQuestionError("An unexpected error occurred");
      }
      setAddQuestionSuccess(null);
    }
  };

  // Handle AvailableModules
  const handleGetModules = async () => {
    try {
      setModulesError(null);
      const response = await axios.get("/api/modules/available", {
        params: { performance },
      });
      setModules(response.data);
    } catch (err) {
      if (err instanceof Error) {
        setModulesError(err.message || "Failed to fetch modules");
      } else {
        setModulesError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* Check Module Access Section */}
      <section>
        <h1 className="text-xl font-bold mb-4">Check Module Access</h1>
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Enter your performance metric"
            value={performance || ""}
            onChange={(e) => setPerformance(Number(e.target.value))}
            className="border p-2 w-full"
          />
          <button
            onClick={handleCheckAccess}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Check Access
          </button>
          {accessResult && <p className="text-green-500">{accessResult}</p>}
          {accessError && <p className="text-red-500">{accessError}</p>}
        </div>
      </section>

      {/* Add Question Section */}
      <section>
        <h1 className="text-xl font-bold mb-4">Add a Question</h1>
        <form onSubmit={handleAddQuestion} className="space-y-4">
          <div>
            <label className="block font-semibold">Question</label>
            <input
              type="text"
              name="question"
              value={questionForm.question}
              onChange={handleQuestionChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Difficulty</label>
            <select
              name="difficulty"
              value={questionForm.difficulty}
              onChange={handleQuestionChange}
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
              value={questionForm.type}
              onChange={handleQuestionChange}
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
              value={questionForm.module}
              onChange={handleQuestionChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Answer</label>
            <input
              type="text"
              name="answer"
              value={questionForm.answer}
              onChange={handleQuestionChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Question
          </button>
          {addQuestionSuccess && <p className="text-green-500">{addQuestionSuccess}</p>}
          {addQuestionError && <p className="text-red-500">{addQuestionError}</p>}
        </form>
      </section>

      {/* Available Modules Section */}
      <section>
        <h1 className="text-xl font-bold mb-4">Available Modules</h1>
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Enter your performance metric"
            value={performance || ""}
            onChange={(e) => setPerformance(Number(e.target.value))}
            className="border p-2 w-full"
          />
          <button
            onClick={handleGetModules}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Get Modules
          </button>
          {modulesError && <p className="text-red-500">{modulesError}</p>}
          {modules.length > 0 && (
            <ul className="space-y-2">
              {modules.map((module) => (
                <li key={module.id} className="border rounded p-4">
                  <h2 className="font-bold">{module.name}</h2>
                  <p>{module.description}</p>
                </li>
              ))}
            </ul>
          )}
          {modules.length === 0 && !modulesError && performance !== undefined && (
            <p className="text-gray-500">
              No modules available for the provided performance metric.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ModulesPage;
