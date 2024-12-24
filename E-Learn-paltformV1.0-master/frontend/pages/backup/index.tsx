import { useState } from 'react';
import Layout from '@/pages/components/layout';
import { Save, Cloud, Download } from 'lucide-react';

const BackupPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastBackup, setLastBackup] = useState<string | null>(null);
  const [backupStatus, setBackupStatus] = useState<{
    message: string;
    type: 'success' | 'error' | null;
  }>({ message: '', type: null });

  const handleBackup = async () => {
    setIsLoading(true);
    setBackupStatus({ message: '', type: null });

    try {
      const response = await fetch('/api/backup/create', {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        setLastBackup(new Date().toLocaleString());
        setBackupStatus({
          message: 'Backup completed successfully!',
          type: 'success'
        });
      } else {
        throw new Error('Backup failed');
      }
    } catch (error) {
      setBackupStatus({
        message: 'Failed to create backup. Please try again.',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Backup Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
            <div className="flex items-center mb-4">
              <Cloud className="w-8 h-8 text-blue-500 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">Backup Status</h2>
            </div>
            {lastBackup && (
              <p className="text-gray-600">Last backup: {lastBackup}</p>
            )}
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-100">
            <div className="flex items-center mb-4">
              <Download className="w-8 h-8 text-purple-500 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">Quick Actions</h2>
            </div>
            <button
              onClick={handleBackup}
              disabled={isLoading}
              className={`
                flex items-center px-4 py-2 rounded-lg text-white
                ${isLoading 
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600'}
                transition-colors duration-200
              `}
            >
              <Save className="w-5 h-5 mr-2" />
              {isLoading ? 'Creating Backup...' : 'Start Backup'}
            </button>
          </div>
        </div>

        {backupStatus.message && (
          <div className={`
            p-4 rounded-lg mb-4
            ${backupStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
          `}>
            {backupStatus.message}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BackupPage;
