// src/components/Forum/CreateThreadModal.tsx
import React, { useState } from 'react';
import { forumService } from '../../forum.service';
import Modal from '../UI/Modal';
import Button from '../UI/Button';

interface CreateThreadModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  onThreadCreated: () => void;
}

const CreateThreadModal: React.FC<CreateThreadModalProps> = ({ 
  isOpen, 
  onClose, 
  courseId,
  onThreadCreated 
}) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateThread = async () => {
    if (!title.trim()) {
      setError('Thread title cannot be empty');
      return;
    }

    try {
      setIsCreating(true);
      // Replace with actual user ID in a real application
      await forumService.createThread(courseId, title, 'user123');
      onThreadCreated();
      onClose();
    } catch (err) {
      setError('Failed to create thread');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Create New Thread"
    >
      <div className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError('');
          }}
          placeholder="Enter thread title"
          className="w-full p-2 border rounded-md"
        />
        
        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        <Button 
          onClick={handleCreateThread}
          disabled={isCreating}
          className="w-full"
        >
          {isCreating ? 'Creating Thread...' : 'Create Thread'}
        </Button>
      </div>
    </Modal>
  );
};

export default CreateThreadModal;