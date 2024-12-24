import Layout from '@/pages/components/layout';
import { MessageSquare, Plus } from 'lucide-react';

const ForumPage = () => {
  const dummyThreads = [
    { title: "Welcome to the Forum!", replies: 23, author: "Admin" },
    { title: "Getting Started Guide", replies: 15, author: "Moderator" },
    { title: "Tips & Tricks", replies: 45, author: "User123" },
  ];

  return (
    <Layout>
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Discussion Forum</h1>
          <button className="flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200">
            <Plus className="w-5 h-5 mr-2" />
            New Thread
          </button>
        </div>
        
        <div className="space-y-4">
          {dummyThreads.map((thread, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">{thread.title}</h3>
                  <p className="text-sm text-gray-500">Posted by {thread.author}</p>
                </div>
                <div className="flex items-center text-gray-600">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  <span>{thread.replies}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ForumPage;