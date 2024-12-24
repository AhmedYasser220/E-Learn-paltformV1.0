import { useState } from 'react';
import { Thread } from '@/app/layout';
import { CreateThreadModal } from './createthreadmodal';
import { ThreadReplies } from '../forum/threadreplies';
import { Button } from '@headlessui/react';

interface ThreadListProps {
  threads: Thread[];
  onThreadCreated: () => void;
}

export const ThreadList = ({ threads, onThreadCreated }: ThreadListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Discussion Threads</h2>
        <Button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          New Thread
        </Button>
      </div>

      <div className="space-y-4">
        {threads.map((thread) => (
          <div
            key={thread._id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-medium mb-2">{thread.title}</h3>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>
                {thread.replies.length} {thread.replies.length === 1 ? 'reply' : 'replies'}
              </span>
              <Button
                onClick={() => setSelectedThread(thread)}
                className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
              >
                View Discussion
              </Button>
            </div>
          </div>
        ))}
      </div>

      <CreateThreadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onThreadCreated={onThreadCreated}
        courseId={''}
      />

      {selectedThread && (
        <ThreadReplies
          thread={selectedThread}
          onClose={() => setSelectedThread(null)}
          onReplyAdded={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      )}
    </div>
  );
};
