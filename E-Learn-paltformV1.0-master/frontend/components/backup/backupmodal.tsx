import { useState } from 'react';
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';

interface BackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export const BackupModal = ({ isOpen, onClose, onConfirm }: BackupModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      await onConfirm();
      onClose();
    } catch (error) {
      console.error('Backup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Backup">
      <div className="space-y-4">
        <p>Are you sure you want to initiate a system backup?</p>
        <div className="flex justify-end space-x-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleConfirm}
            isLoading={isLoading}
          >
            Confirm Backup
          </Button>
        </div>
      </div>
    </Modal>
  );
};