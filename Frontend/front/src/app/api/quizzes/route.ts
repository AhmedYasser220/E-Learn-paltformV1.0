import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000'; // Replace with your actual API URL

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

export const getQuizzesByStudentEmail = async (studentEmail: string) => {
  try {
    // API endpoint to get the student data by email
    const response = await api.get(`/students/email/${studentEmail}`);
    const studentData = response.data;

    // Fetch quizzes based on the student's enrolled modules
    if (studentData && studentData.enrolledModules && studentData.enrolledModules.length > 0) {
      const moduleIds = studentData.enrolledModules;
      const quizzesResponse = await api.get(`/quizzes?moduleIds=${moduleIds.join(',')}`);
      return quizzesResponse.data; // Return quizzes data
    } else {
      throw new Error('Student is not enrolled in any modules');
    }
  } catch (error) {
    console.error('Error fetching quizzes by student email:', error);
    throw error; // Throw error if anything fails
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
