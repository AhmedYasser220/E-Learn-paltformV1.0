import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from 'react';
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';
import { forumService } from '@/lib/services/forum.service';
import { Thread } from '@/app/layout';

interface ThreadRepliesProps {
  thread: Thread;
  onClose: () => void;
  onReplyAdded: () => void;
}

export const ThreadReplies = ({ thread, onClose, onReplyAdded }: ThreadRepliesProps) => {
  const [replyText, setReplyText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await forumService.addReply(thread._id, replyText, 'currentUserId'); // Replace with actual user ID
      setReplyText('');
      onReplyAdded();
    } catch (error) {
      console.error('Failed to add reply:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title={thread.title}>
      <div className="space-y-4">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {thread.replies.map((reply: { body: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; createdAt: string | number | Date; }, index: Key | null | undefined) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg">
              <p className="text-gray-800">{reply.body}</p>
              <div className="mt-2 text-sm text-gray-500">
                {new Date(reply.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmitReply} className="space-y-4">
          <div>
            <label htmlFor="reply" className="block text-sm font-medium text-gray-700">
              Your Reply
            </label>
            <textarea
              id="reply"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button type="submit" isLoading={isLoading}>
              Post Reply
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
export type { Thread };

