// src/components/Forum/ThreadList.tsx
import React, { useState, useEffect } from 'react';
import { forumService } from '../../forum.service';

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

  if (loading) return <div>Loading threads...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="thread-list">
      <h2 className="text-2xl font-bold mb-4">Course Threads</h2>
      {threads.map((thread) => (
        <div 
          key={thread._id} 
          className="border rounded p-4 mb-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="font-semibold text-lg">{thread.title}</h3>
          <p className="text-gray-600">Author: {thread.authorId}</p>
          <p className="text-sm">Replies: {thread.replies.length}</p>
        </div>
      ))}
    </div>
  );
};

export default ThreadList;