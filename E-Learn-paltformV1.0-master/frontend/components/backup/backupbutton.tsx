import { useState } from 'react';
import { Button } from '../ui/button';
import { backupService } from '@/lib/services/backup.service';

interface BackupButtonProps {
  onBackupComplete: () => void;
}

export const BackupButton = ({ onBackupComplete }: BackupButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleBackup = async () => {
    try {
      setIsLoading(true);
      await backupService.scheduleBackup();
      onBackupComplete();
    } catch (error) {
      console.error('Backup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleBackup} 
      isLoading={isLoading}
    >
      Initiate Backup
    </Button>
  );
};