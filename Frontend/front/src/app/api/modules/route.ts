import axios from "axios";

const BASE_URL = 'http://localhost:4000';

// Check if the student can access the module
export const checkModuleAccess = async (moduleId: string, studentPerformance: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/access/${moduleId}`, {
      params: { studentPerformance },
    });
    return response.data; // { message: 'Access granted' }
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Access denied");
    }
    throw new Error(error.message || "Failed to check access");
  }
};

// Get available modules for a student based on their performance
export const getAvailableModules = async (performance: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/available`, {
      params: { performance },
    });
    return response.data; // List of modules
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Failed to fetch modules");
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

// Add a question to a module's question bank
export const addQuestionToModule = async (questionDto: {
  module_id: string;
  question: {
    question: string;
    difficulty: string;
    options?: string[];
    correctAnswer: string;
    type: string;
    course_id?: string;
    title?: string;
    content?: string;
    resources?: string[];
  }[];
}) => {
  try {
    const response = await axios.post(`${BASE_URL}/add-question`, questionDto);
    return response.data; // Updated module object
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Failed to add question");
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};
