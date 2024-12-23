const API_BASE_URL = 'http://localhost:3000/api';

export const backupService = {
  async scheduleBackup() {
    try {
      const response = await fetch(`${API_BASE_URL}/backup/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Backup scheduling failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error scheduling backup:', error);
      throw error;
    }
  },

  async getBackups() {
    try {
      const response = await fetch(`${API_BASE_URL}/backup`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch backups');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching backups:', error);
      throw error;
    }
  }
};