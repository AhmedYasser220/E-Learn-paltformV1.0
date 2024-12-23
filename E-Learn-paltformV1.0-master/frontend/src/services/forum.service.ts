const API_BASE_URL = 'http://localhost:3003/api'; // Backend API base URL

export const forumService = {
  // Create a new thread
  async createThread(courseId: string, title: string, authorId: string, p0: { courseId: string; title: string; authorId: string; }) {
    try {
      const response = await fetch(`${API_BASE_URL}/forums/thread`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId, title, authorId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create thread: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating thread:', error);
      throw error;
    }
  },

  // Add a reply to a thread
  async addReply(threadId: string, body: string, authorId: string, p0: { threadId: string; body: string; authorId: string; }) {
    try {
      const response = await fetch(`${API_BASE_URL}/forums/reply/${threadId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body, authorId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add reply: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding reply:', error);
      throw error;
    }
  },

  // Get threads by course
  async getThreadsByCourse(courseId: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/forums/course/${courseId}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch threads: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching threads:', error);
      throw error;
    }
  },
};
