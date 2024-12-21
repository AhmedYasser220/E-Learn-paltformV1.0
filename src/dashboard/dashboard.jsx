// Import required libraries and components
import React, { useEffect, useState } from 'react'; // React for UI building, useState and useEffect hooks for state and lifecycle management
import axios from 'axios'; // Axios for making HTTP requests
import './Dashboard.css'; // Import CSS for styling the dashboard

// Dashboard Component to visualize metrics
const Dashboard = ({ userId }) => {
  // State variables to store metrics
  const [completionRate, setCompletionRate] = useState(0);
  const [averageScores, setAverageScores] = useState(0);
  const [engagement, setEngagement] = useState(0);
  const [loading, setLoading] = useState(true); // Loading indicator
  const [error, setError] = useState(null); // Error indicator

  // Fetch dashboard metrics when the component is mounted
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // Make an API call to the backend to fetch metrics for the given userId
        const response = await axios.get(
          `http://localhost:3000/progress/student-dashboard/${userId}`
        );

        // Extract data from the response
        const { completionRate, averageScores, engagement } = response.data;

        // Update state variables with the fetched data
        setCompletionRate(completionRate);
        setAverageScores(averageScores);
        setEngagement(engagement);
      } catch (err) {
        // Handle errors and set the error state
        setError(err.message);
      } finally {
        // Set loading to false once data is fetched or an error occurs
        setLoading(false);
      }
    };

    // Trigger the fetch function
    fetchMetrics();
  }, [userId]); // Dependency array ensures the effect runs only when userId changes

  // Render loading state
  if (loading) return <div>Loading...</div>;

  // Render error state
  if (error) return <div>Error: {error}</div>;

  // Render the dashboard metrics
  return (
    <div className="dashboard">
      <h1>Student Dashboard</h1>

      {/* Display Completion Rate */}
      <div className="metric">
        <h2>Completion Rate</h2>
        <p>{completionRate}%</p>
      </div>

      {/* Display Average Scores */}
      <div className="metric">
        <h2>Average Scores</h2>
        <p>{averageScores}</p>
      </div>

      {/* Display Engagement */}
      <div className="metric">
        <h2>Engagement</h2>
        <p>{engagement}</p>
      </div>
    </div>
  );
};

export default Dashboard;
