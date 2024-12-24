'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { CircularProgress, Typography, Button, Card, CardContent, CardHeader, Divider, List, ListItem, ListItemText, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

// Define the structure of a MultimediaResource and Course based on your backend response
interface MultimediaResource {
  filePath: string;
  isOutdated: boolean;
  description?: string;
  archived: boolean;
}

interface Version {
  version_number: string;
  title: string;
  updated_by: string;
  updated_at: string;
}

interface Course {
  course_Id: string;
  title: string;
  description: string;
  category: string;
  difficulty_level: string;
  created_by: string;
  current_version: string;
  is_available: boolean;
  multimedia_resources: MultimediaResource[];
  versions: Version[];
}

export default function GetCoursePageById() {
  const { courseId } = useParams(); // Get courseId from URL parameters
  const router = useRouter();

  const [course, setCourse] = useState<Course | null>(null);
  const [multimediaResources, setMultimediaResources] = useState<MultimediaResource[]>([]); // State for multimedia resources
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newResource, setNewResource] = useState<string>(''); // State for new resource input
  const [isInstructor, setIsInstructor] = useState<boolean>(false); // State for instructor check
  const [viewResource, setViewResource] = useState<MultimediaResource | null>(null); // State for the resource to view
  const [openModal, setOpenModal] = useState<boolean>(false); // State to control modal visibility

  // Example of checking if the user is an instructor (this should be replaced with your auth logic)
  useEffect(() => {
    const userRole = localStorage.getItem('userRole'); // Example logic, replace with your actual authentication logic
    if (userRole === 'instructor') {
      setIsInstructor(true);
    }
  }, []);

  // Fetch course by ID when the component mounts
  useEffect(() => {
    if (!courseId) return; // If no courseId is available, return early

    const fetchCourse = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`http://localhost:3001/courses/${courseId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch course data');
        }

        const data = await response.json();
        setCourse(data); // Set the fetched course data to state
        setMultimediaResources(data.multimedia_resources || []); // Set multimedia resources
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  // Handle the back navigation
  const handleBack = () => {
    router.push('/courses');
  };

  // Handle delete functionality for multimedia
  const handleRemoveResource = async (filePath: string) => {
    if (!courseId) return;

    try {
      const response = await fetch(`http://localhost:3001/courses/${courseId}/multimedia`, {
        method: 'DELETE',
        body: JSON.stringify({ filePath }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to delete multimedia resource');
      }

      // If successful, update the multimedia resources state
      setMultimediaResources((prev) => prev.filter((resource) => resource.filePath !== filePath));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  // Handle archiving functionality for multimedia
  const handleArchiveResource = async (filePath: string) => {
    if (!courseId) return;

    try {
      const response = await fetch(`http://localhost:3001/courses/${courseId}/multimedia/archive`, {
        method: 'PATCH',
        body: JSON.stringify({ filePath }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to archive multimedia resource');
      }

      // If successful, update the multimedia resources state
      setMultimediaResources((prev) =>
        prev.map((resource) =>
          resource.filePath === filePath ? { ...resource, archived: true } : resource
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  // Handle opening the resource details in a modal
  const handleViewResource = (resource: MultimediaResource) => {
    setViewResource(resource); // Set the resource to view
    setOpenModal(true); // Open the modal
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setViewResource(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <Typography variant="h6" color="error" className="text-center">{error}</Typography>
        <Button onClick={handleBack} variant="contained" color="primary" fullWidth>
          Back to Courses
        </Button>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <Typography variant="h6" color="error" className="text-center">Course not found</Typography>
        <Button onClick={handleBack} variant="contained" color="primary" fullWidth>
          Back to Courses
        </Button>
      </div>
    );
  }

  const handleDelete = async () => {
    if (!courseId) return;

    try {
      const response = await fetch(`http://localhost:3001/courses/${courseId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete course');
      }

      // Redirect to courses page after successful deletion
      router.push('/courses');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  const handleAddResource = async () => {
    if (!courseId || !newResource) return;

    try {
      const response = await fetch(`http://localhost:3001/courses/${courseId}/multimedia`, {
        method: 'POST',
        body: JSON.stringify({ filePath: newResource }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to add multimedia resource');
      }

      const addedResource: MultimediaResource = await response.json();

      // Update the multimedia resources state with the newly added resource
      setMultimediaResources((prev) => [...prev, addedResource]);
      setNewResource(''); // Clear the input field
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <Card>
        <CardHeader title={course.title} subheader={`ID: ${course.course_Id}`} />
        <Divider />
        <CardContent>
          <Typography variant="h6" className="font-semibold">Description</Typography>
          <Typography variant="body1" className="mb-4">{course.description}</Typography>
          
          <Typography variant="h6" className="font-semibold">Category</Typography>
          <Typography variant="body1" className="mb-4">{course.category}</Typography>
          
          <Typography variant="h6" className="font-semibold">Difficulty Level</Typography>
          <Typography variant="body1" className="mb-4">{course.difficulty_level}</Typography>
          
          <Typography variant="h6" className="font-semibold">Created By</Typography>
          <Typography variant="body1" className="mb-4">{course.created_by}</Typography>
          
          <Typography variant="h6" className="font-semibold">Current Version</Typography>
          <Typography variant="body1" className="mb-4">{course.current_version}</Typography>

          <Typography variant="h6" className="font-semibold">Availability</Typography>
          <Typography variant="body1" className="mb-4">{course.is_available ? 'Available' : 'Not Available'}</Typography>

          <Typography variant="h6" className="font-semibold">Multimedia Resources</Typography>
          {multimediaResources.length > 0 ? (
            <List>
              {multimediaResources.map((resource, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={resource.filePath}
                    secondary={resource.isOutdated ? 'Outdated' : 'Up to date'}
                  />
                  {isInstructor && (
                    <div className="flex space-x-2">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleViewResource(resource)} // View resource
                      >
                        View
                      </Button>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => handleArchiveResource(resource.filePath)} // Archive resource
                      >
                        Archive
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleRemoveResource(resource.filePath)} // Remove resource
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1" className="mb-4">No multimedia resources available</Typography>
          )}

          {/* Only show the input field for instructors */}
          {isInstructor && (
            <div className="mt-4">
              <TextField
                label="New Multimedia Resource"
                value={newResource}
                onChange={(e) => setNewResource(e.target.value)}
                fullWidth
              />
              <Button
                onClick={handleAddResource}
                variant="contained"
                color="primary"
                fullWidth
                className="mt-2"
              >
                Add Resource
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Button onClick={handleBack} variant="contained" color="primary" fullWidth className="mt-4">
        Back to Courses
      </Button>

      <Button onClick={handleDelete} variant="contained" color="error" fullWidth className="mt-4">
        Delete Course
      </Button>

      {/* Modal for viewing resource */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Resource Details</DialogTitle>
        <DialogContent>
          <Typography variant="h6">File Path: {viewResource?.filePath}</Typography>
          <Typography variant="body1">{viewResource?.description || 'No description available'}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
