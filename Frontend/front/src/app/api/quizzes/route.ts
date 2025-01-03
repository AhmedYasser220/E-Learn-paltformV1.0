

import axios from "axios";

const BASE_URL = 'http://localhost:4000';

export interface Quiz {
  quiz_id?: string; // Optional as generated by the server
  module_id: string;
  userPerformance: number;
  questionCount: number;
  questionTypes: string[];
  created_at?: string; // Optional as generated by the server
}

// Fetch all quizzes
export const getAllQuizzes = async (): Promise<Quiz[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/quizzes/quizzes`); // Matches backend
    return response.data; // Ensure response data matches expected format
  } catch (error: any) {
    console.error('Error fetching quizzes:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch quizzes');
  }
};
// Fetch a specific quiz by ID
export const getQuizById = async (quizId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/quizzes/${quizId}`);
    return response.data; // Return the specific quiz
  } catch (error) {
    console.error('Error fetching quiz by ID:', error);
    throw new Error('Failed to fetch quiz by ID');
  }
};

// Create a new quiz
export const createQuiz = async (quizData: Quiz) => {
  try {
    const response = await axios.post(`${BASE_URL}/quizzes`, quizData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data; // Return the created quiz
  } catch (error) {
    console.error('Error creating quiz:', error);
    throw new Error('Failed to create quiz');
  }
};
