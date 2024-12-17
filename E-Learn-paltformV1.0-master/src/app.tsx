import React from 'react';
import BackupButton from './backup/frontend/backup/backupbutton';
import ThreadList from './backup/frontend/Forum/threadlist';

const App: React.FC = () => {
  const COURSE_ID = 'course123';

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Course Forum & Backup Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Backup Management</h2>
          <BackupButton />
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <ThreadList courseId={COURSE_ID} />
        </div>
      </div>
    </div>
  );
};

export default App;