import React, { useState } from 'react';
import { backupService } from '../../backup.service';

const BackupButton: React.FC = () => {
  const [isBackuping, setIsBackuping] = useState(false);
  const [backupStatus, setBackupStatus] = useState('');

  const handleBackup = async () => {
    setIsBackuping(true);
    try {
      const result = await backupService.scheduleBackup();
      setBackupStatus('Backup scheduled successfully!');
    } catch (error) {
      setBackupStatus('Backup failed. Please try again.');
    } finally {
      setIsBackuping(false);
    }
  };

  return (
    <div className="backup-section">
      <button 
        onClick={handleBackup} 
        disabled={isBackuping}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {isBackuping ? 'Scheduling Backup...' : 'Schedule Backup'}
      </button>
      {backupStatus && (
        <p className="text-sm mt-2 text-gray-600">{backupStatus}</p>
      )}
    </div>
  );
};

export default BackupButton;