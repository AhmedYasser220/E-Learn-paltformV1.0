"use client" 
import { useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Layout from "../components/layout";
import apiClient from "../services/api";
import Link from "next/link";

const ModulesPage: React.FC = () => {
  const { module_id } = useParams();
  const [acessPerformance, setAcessPerformance] = useState<number | undefined>();
  const [performance, setPerformance] = useState<number | undefined>();
  const [accessResult, setAccessResult] = useState<string | null>(null);
  const [accessError, setAccessError] = useState<string | null>(null);


  // States for AvailableModules
  const [modules, setModules] = useState<any[]>([]);
  const [modulesError, setModulesError] = useState<string | null>(null);
console.log('modules',modules)
  // Handle CheckModuleAccess
  const handleCheckAccess = async () => {
    try {
      setAccessError(null);
      const response = await apiClient.get(`/api/modules/access/${module_id}`, {
        params: { studentPerformance: acessPerformance },
      });
      setAccessResult(response.data.message);
    } catch (err) {
      if (err instanceof Error) {
        setAccessError(err.message || "Failed to check access");
      } else {
        setAccessError("An unexpected error occurred");
      }
      setAccessResult(null);
    }
  };

  // Handle AvailableModules
  const handleGetModules = async () => {
    if (performance === undefined) {
      setModulesError("Please enter a valid performance metric.");
      return;
    }
    try {
      setModulesError(null);
      setModules([]);  // Clear previous modules
      // http://localhost:4000/modules/available?performance=80
      const response = await apiClient.get("/modules/available", {
        params: { performance },
      });
      console.log('res',response)
      setModules(response.data);
    } catch (err) {
      if (err instanceof Error) {
        setModulesError(err.message || "Failed to fetch modules");
      } else {
        setModulesError("An unexpected error occurred");
      }
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 space-y-8">
        {/* Check Module Access Section */}
        {/* <section>
          <h1 className="text-xl font-bold mb-4">Check Module Access</h1>
          <div className="space-y-4">
            <input
              type="number"
              placeholder="Enter your performance metric"
              value={acessPerformance || ""}
              onChange={(e) => setAcessPerformance(Number(e.target.value))}
              className="border p-2 w-full"
            />
            <button
              onClick={handleCheckAccess}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Check Access
            </button>
            {accessResult && <p className="text-green-500">{accessResult}</p>}
            {accessError && <p className="text-red-500">{accessError}</p>}
          </div>
        </section> */}

        {/* Available Modules Section */}
        <section>
          <h1 className="text-xl font-bold mb-4">Available Modules</h1>
          <div className="space-y-4">
            <input
              type="number"
              placeholder="Enter your performance metric"
              value={performance || ""}
              onChange={(e) => setPerformance(Number(e.target.value))}
              className="border p-2 w-full"
            />
            <button
              onClick={handleGetModules}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Get Modules
            </button>
            {modulesError && <p className="text-red-500">{modulesError}</p>}
            {modules.length > 0 && (
              <ul className="space-y-2">
                {modules.map((module) => (
                  <li key={module._id} className="border rounded p-4">
                    <h2 className="font-bold">{module.title}</h2>
                    <p>{module.content}</p>
                  </li>
                ))}
                <Link href={`/modules/${module_id}`}>
                <button>View Module</button>
                </Link>
              </ul>
            )}
            {modules.length === 0 && !modulesError && performance !== undefined && (
              <p className="text-gray-500">
                No modules available for the provided performance metric.
              </p>
            )}
          </div>
        </section>
      </div>
      <div style={{marginTop:'40px'}}>
      <Link href={`/modules/add-question`}>
      <button>Add Question to modules</button>
      </Link>
      </div>
    </Layout>
  );
};

export default ModulesPage;
