"use client";

import { useState } from 'react';
import axios from 'axios';

const AvailableModulesPage = () => {
  const [performance, setPerformance] = useState<number | undefined>();
  const [modules, setModules] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGetModules = async () => {
    try {
      setError(null);
      const response = await axios.get('/api/modules/available', {
        params: { performance },
      });
      setModules(response.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to fetch modules');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Available Modules</h1>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Enter your performance metric"
          value={performance || ''}
          onChange={(e) => setPerformance(Number(e.target.value))}
          className="border p-2 w-full"
        />
        <button
          onClick={handleGetModules}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Get Modules
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {modules.length > 0 && (
          <ul className="space-y-2">
            {modules.map((module) => (
              <li key={module.id} className="border rounded p-4">
                <h2 className="font-bold">{module.name}</h2>
                <p>{module.description}</p>
              </li>
            ))}
          </ul>
        )}
        {modules.length === 0 && !error && performance !== undefined && (
          <p className="text-gray-500">No modules available for the provided performance metric.</p>
        )}
      </div>
    </div>
  );
};

export default AvailableModulesPage;
