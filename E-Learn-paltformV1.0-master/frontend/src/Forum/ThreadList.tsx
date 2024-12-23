import React, { useState, useEffect } from 'react';
import { forumService } from '../services/forum.service';

interface Thread {
  _id: string;
  title: string;
  courseId: string;
  authorId: string;
  replies: Reply[];
}

interface Reply {
  body: string;
  authorId: string;
  createdAt: Date;
}

interface ThreadListProps {
  courseId: string;
}

const ThreadList: React.FC<ThreadListProps> = ({ courseId }) => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const fetchedThreads = await forumService.getThreadsByCourse(courseId);
        setThreads(fetchedThreads);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch threads');
        setLoading(false);
      }
    };

    fetchThreads();
  }, [courseId]);

  if (loading) return <div className="text-center text-gray-500">Loading threads...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="thread-list">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Course Threads</h2>
      {threads.length === 0 ? (
        <div className="text-center text-gray-500">No threads available</div>
      ) : (
        threads.map((thread) => (
          <div
            key={thread._id}
            className="border rounded-lg p-6 mb-4 shadow-md hover:shadow-xl transition-shadow"
          >
            <h3 className="font-semibold text-xl text-blue-600">{thread.title}</h3>
            <p className="text-gray-600 mt-2">Author: {thread.authorId}</p>
            <p className="text-sm text-gray-500 mt-1">Replies: {thread.replies.length}</p>
            <button className="mt-4 text-blue-500 hover:text-blue-700">View Thread</button>
          </div>
        ))
      )}
    </div>
  );
};

export default ThreadList;
