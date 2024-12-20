import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Replace with your actual API URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface CreateQuizDto {
  module_id: string;
  userPerformance: number;
  questionCount: number;
  questionTypes: string[];
}

export const fetchAllQuizzes = async () => {
  try {
    const response = await api.get('/quizzes');
    return response.data;
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    throw error;
  }
};

export const createQuiz = async (quizData: CreateQuizDto) => {
  try {
    const response = await api.post('/quizzes', quizData);
    return response.data;
  } catch (error) {
    console.error('Error creating quiz:', error);
    throw error;
  }
};

export const getQuizById = async (quizId: string) => {
  try {
    const response = await api.get(`/quizzes/${quizId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching quiz with ID ${quizId}:`, error);
    throw error;
  }
};
