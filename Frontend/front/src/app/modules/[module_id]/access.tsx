"use client";

import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';

const CheckModuleAccessPage = () => {
  const router = useRouter();
  const { module_id } = router.query;

  const [performance, setPerformance] = useState<number | undefined>();
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheckAccess = async () => {
    try {
      setError(null);
      const response = await axios.get(`/api/modules/access/${module_id}`, {
        params: { studentPerformance: performance },
      });
      setResult(response.data.message);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to check access');
      } else {
        setError('An unexpected error occurred');
      }
      setResult(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Check Module Access</h1>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Enter your performance metric"
          value={performance || ''}
          onChange={(e) => setPerformance(Number(e.target.value))}
          className="border p-2 w-full"
        />
        <button
          onClick={handleCheckAccess}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Check Access
        </button>
        {result && <p className="text-green-500">{result}</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default CheckModuleAccessPage;
