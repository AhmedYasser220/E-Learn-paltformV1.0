import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const backupService = {
  getBackups: async () => {
    const response = await axios.get(`${API_URL}/backup`);
    return response.data;
  },

  scheduleBackup: async () => {
    const response = await axios.post(`${API_URL}/backup/schedule`);
    return response.data;
  }
};