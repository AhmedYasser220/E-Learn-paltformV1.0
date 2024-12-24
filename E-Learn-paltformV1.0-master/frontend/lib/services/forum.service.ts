import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const forumService = {
  createThread: async (courseId: string, title: string, authorId: string) => {
    const response = await axios.post(`${API_URL}/forums/thread`, {
      courseId,
      title,
      authorId
    });
    return response.data;
  },

  addReply: async (threadId: string, body: string, authorId: string) => {
    const response = await axios.post(`${API_URL}/forums/reply/${threadId}`, {
      body,
      authorId
    });
    return response.data;
  },

  getThreadsByCourse: async (courseId: string) => {
    const response = await axios.get(`${API_URL}/forums/course/${courseId}`);
    return response.data;
  }
};