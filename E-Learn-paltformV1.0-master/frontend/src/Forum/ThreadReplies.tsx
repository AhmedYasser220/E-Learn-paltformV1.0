// src/components/Forum/ThreadReplies.tsx
import React, { useState } from 'react';
import Button from '../UI/button';
import Modal from '../UI/modal';
import { forumService } from '../services/forum.service';

interface Reply {
  body: string;
  authorId: string;
  createdAt: Date;
}

interface ThreadRepliesProps {
  threadId: string;
  replies: Reply[];
  onReplyAdded: (reply: Reply) => void;
}

const ThreadReplies: React.FC<ThreadRepliesProps> = ({ 
  threadId, 
  replies, 
  onReplyAdded 
}) => {
  const [newReply, setNewReply] = useState('');
  const [isAddingReply, setIsAddingReply] = useState(false);
  const [error, setError] = useState('');

  const handleAddReply = async () => {
    if (!newReply.trim()) {
      setError('Reply cannot be empty');
      return;
    }

    try {
      setIsAddingReply(true);
      const reply = await forumService.addReply(threadId, newReply, 'user123', { threadId, body: newReply, authorId: 'user123' });
      onReplyAdded(reply);
      setNewReply('');
      setError('');
    } catch (err) {
      setError('Failed to add reply');
    } finally {
      setIsAddingReply(false);
    }
  };

  return (
    <div className="thread-replies mt-4">
      <h4 className="text-xl font-semibold mb-3">Replies ({replies.length})</h4>
      
      {replies.map((reply, index) => (
        <div 
          key={index} 
          className="bg-gray-100 p-3 rounded-lg mb-2"
        >
          <p>{reply.body}</p>
          <div className="text-sm text-gray-500 mt-1">
            By {reply.authorId} on {new Date(reply.createdAt).toLocaleString()}
          </div>
        </div>
      ))}

      <div className="reply-input mt-4">
        <textarea
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          placeholder="Write a reply..."
          className="w-full p-2 border rounded-md"
          rows={3}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        
        <Button 
          onClick={handleAddReply}
          disabled={isAddingReply}
          className="mt-2"
        >
          {isAddingReply ? 'Sending...' : 'Add Reply'}
        </Button>
      </div>
    </div>
  );
};

export default ThreadReplies;