import React, { useState } from 'react';
import Modal from '../UI/modal';
import Button from '../UI/button';
import { forumService } from '../services/forum.service';

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
      console.log('Creating thread with title:', title);  // Debugging log
      const response = await forumService.createThread(courseId, title, 'user123', { courseId, title, authorId: 'user123' });
      console.log('Thread Created:', response);  // Debugging log
      onThreadCreated();
      onClose();
    } catch (err) {
      console.error('Error creating thread:', err);  // Debugging log
      setError('Failed to create thread. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Thread">
      <div className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError(''); // Clear error on user input
          }}
          placeholder="Enter thread title"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
