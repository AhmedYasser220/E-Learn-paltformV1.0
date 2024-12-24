import { useState } from 'react';
import Layout from '@/pages/components/layout';
import { Plus, MessageSquare, MoreVertical } from 'lucide-react';

interface Thread {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  replies: number;
}

const ThreadsPage = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newThread, setNewThread] = useState({ title: '', content: '' });
  const [error, setError] = useState('');

  const handleCreateThread = async () => {
    if (!newThread.title.trim() || !newThread.content.trim()) {
      setError('Title and content are required');
      return;
    }

    try {
      const response = await fetch('/api/threads/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newThread)
      });

      if (response.ok) {
        const createdThread = await response.json();
        setThreads([createdThread, ...threads]);
        setIsModalOpen(false);
        setNewThread({ title: '', content: '' });
        setError('');
      } else {
        throw new Error('Failed to create thread');
      }
    } catch (err) {
      setError('Failed to create thread. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Discussion Threads</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-colors duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Thread
          </button>
        </div>

        {/* Thread List */}
        <div className="space-y-4">
          {threads.length > 0 ? (
            threads.map((thread) => (
              <div
                key={thread.id}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">{thread.title}</h3>
                    <p className="text-sm text-gray-500">
                      Posted by {thread.author} on {new Date(thread.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      <span>{thread.replies}</span>
                    </div>
                    <button className="p-1 hover:bg-gray-200 rounded-full">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center py-8">No threads yet. Be the first to create one!</p>
          )}
        </div>

        {/* Create Thread Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Create New Thread</h2>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Thread Title</label>
                  <input
                    type="text"
                    value={newThread.title}
                    onChange={(e) => setNewThread({ ...newThread, title: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Thread Content</label>
                  <textarea
                    value={newThread.content}
                    onChange={(e) => setNewThread({ ...newThread, content: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    rows={4}
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateThread}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ThreadsPage;
