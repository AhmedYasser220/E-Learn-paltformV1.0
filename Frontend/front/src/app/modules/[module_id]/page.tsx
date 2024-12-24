"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Use useParams from next/navigation
import Layout from "@/app/components/layout";
import { fetchModuleById } from "@/app/api/modules/route";

const ModuleDetailPage: React.FC = () => {
    const { module_id } = useParams(); // Get module_id from the URL
    const [module, setModule] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");
  
    useEffect(() => {
        if (!module_id) return; // Ensure quiz_id exists before making API call
    
        const fetchQuizDetails = async () => {
          try {
            const response = await fetch(`http://localhost:4000/modules/${module_id}`);
            if (!response.ok) {
              throw new Error(`Failed to fetch quiz details: ${response.status}`);
            }
            const data = await response.json();
            setModule(data);
          } catch (err) {
            setError("Failed to load quiz details.");
            console.error("Error fetching quiz details:", err);
          } finally {
            setLoading(false);
          }
        };
    
        fetchQuizDetails();
      }, [module_id]); 
  
    if (loading) return <p>Loading module details...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
  
    if (!module) return <p>Module not found.</p>;
  
    return (
      <Layout>
        <div className="container mx-auto p-4">
          <h1 className="text-xl font-bold mb-4">{`Module ID: ${module.module_id}`}</h1>
          <p>{`Name: ${module.name}`}</p>
          <p>{`Description: ${module.description}`}</p>
          <p>{`Created At: ${new Date(module.created_at).toLocaleDateString()}`}</p>
          <h2 className="mt-4">Contents</h2>
          <ul>
            {module.contents?.map((content: any, index: number) => (
              <li key={index} className="border p-2 mb-4">
                <h3 className="font-bold">{content.title}</h3>
                <p>{content.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </Layout>
    );
  };
  
  export default ModuleDetailPage;