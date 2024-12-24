import { useState } from 'react';
import axios from 'axios';

interface FlagResourceButtonProps {
  courseId: string;
  resourcePath: string;
}

const FlagResourceButton = ({ courseId, resourcePath }: FlagResourceButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleFlagResourceAsOutdated = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.put(
        `http://localhost:3001/courses/${courseId}/resources/outdated`,
        { resourcePath }
      );

      if (response.status === 200) {
        setSuccessMessage('Resource successfully flagged as outdated');
      }
    } catch (err) {
      setError('Failed to flag resource as outdated');
      console.error('Error flagging resource:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      <button onClick={handleFlagResourceAsOutdated} disabled={loading}>
        {loading ? 'Flagging...' : 'Flag Resource as Outdated'}
      </button>
    </div>
  );
};

export default FlagResourceButton;
