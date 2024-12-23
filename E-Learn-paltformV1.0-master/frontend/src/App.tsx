import React, { useState } from 'react';
import Card from './UI/card';  
import ThreadList from './Forum/ThreadList';  
import CreateThreadModal from './Forum/CreateThreadModal';  
import BackupButton from './backup/backupbutton';  
import BackupModal from './backup/BackupModal';  
import logo from './logo.svg';

const AppComponent: React.FC = () => {
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [isCreateThreadModalOpen, setIsCreateThreadModalOpen] = useState(false);
  const COURSE_ID = 'course123';

  const handleThreadCreated = () => {
    setIsCreateThreadModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 text-center">Course Forum & Backup Management</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Backup Section */}
          <Card className="md:col-span-1 p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold mb-4">Backup Management</h2>
            <BackupButton onClick={() => setIsBackupModalOpen(true)} />
          </Card>

          {/* Forum Section */}
          <Card className="md:col-span-2 p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Course Forum</h2>
              <button
                onClick={() => setIsCreateThreadModalOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                New Thread
              </button>
            </div>
            <ThreadList courseId={COURSE_ID} />
          </Card>
        </div>

        {/* Modals */}
        <BackupModal
          isOpen={isBackupModalOpen}
          onClose={() => setIsBackupModalOpen(false)}
        />

        <CreateThreadModal
          isOpen={isCreateThreadModalOpen}
          onClose={() => setIsCreateThreadModalOpen(false)}
          courseId={COURSE_ID}
          onThreadCreated={handleThreadCreated}
        />
      </div>
    </div>
  );
};
export default AppComponent;
