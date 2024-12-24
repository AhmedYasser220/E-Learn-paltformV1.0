import { useState } from 'react';
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';
import { forumService } from '@/lib/services/forum.service';

interface CreateThreadModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  onThreadCreated: () => void;
}

export const CreateThreadModal = ({
  isOpen,
  onClose,
  courseId,
  onThreadCreated,
}: CreateThreadModalProps) => {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await forumService.createThread(courseId, title, 'currentUserId'); // Replace with actual user ID
      onThreadCreated();
      onClose();
    } catch (error) {
      console.error('Failed to create thread:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Thread">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Thread Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            minLength={3}
          />
        </div>
        <div className="flex justify-end space-x-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Create Thread
          </Button>
        </div>
      </form>
    </Modal>
  );
};