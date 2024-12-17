import React, { useState } from 'react';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import { backupService } from '../../backup.service';

interface BackupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BackupModal: React.FC<BackupModalProps> = ({ isOpen, onClose }) => {
  const [backupStatus, setBackupStatus] = useState('');
  const [isBackuping, setIsBackuping] = useState(false);

  const handleBackup = async () => {
    setIsBackuping(true);
    setBackupStatus('');

    try {
      const result = await backupService.scheduleBackup();
      setBackupStatus('Backup scheduled successfully! Check your MongoDB Compass.');
    } catch (error) {
      setBackupStatus('Backup failed. Please try again.');
    } finally {
      setIsBackuping(false);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Schedule Database Backup"
    >
      <div className="space-y-4">
        <p className="text-gray-600">
          Click the button below to schedule a backup of your user data. 
          The backup will be stored in your MongoDB Compass.
        </p>

        <Button 
          onClick={handleBackup} 
          disabled={isBackuping}
          variant={isBackuping ? 'secondary' : 'primary'}
        >
          {isBackuping ? 'Scheduling Backup...' : 'Schedule Backup'}
        </Button>

        {backupStatus && (
          <p className={`mt-4 ${backupStatus.includes('failed') ? 'text-red-500' : 'text-green-500'}`}>
            {backupStatus}
          </p>
        )}
      </div>
    </Modal>
  );
};

export default BackupModal;