import React, { useState } from 'react';
import { backupService } from '../services/backup.service';

interface BackupButtonProps {
  onClick?: () => void;
}

const BackupButton: React.FC<BackupButtonProps> = ({ onClick }) => {
  const [isBackuping, setIsBackuping] = useState(false);
  const [backupStatus, setBackupStatus] = useState('');

  const handleBackup = async () => {
    if (onClick) onClick(); // Invoke the external onClick if provided
    setIsBackuping(true);
    setBackupStatus(''); // Clear previous status message

    try {
      // Assuming `backupService.scheduleBackup` is the function that schedules a backup.
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
        className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${
          isBackuping ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
        }`}
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
