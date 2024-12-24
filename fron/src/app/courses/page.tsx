"use client";

import { useState, useEffect } from 'react';
import { Button, Card, Container, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import axios from 'axios';
import { Course } from '../types/course';
import FlagResourceButton from '../components/FlagResourceButton';

export default function CoursesList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:3001/courses');
      console.log('Courses fetched:', response.data); // Check what the API returns

      if (Array.isArray(response.data)) {
        setCourses(response.data); // Set the courses if the response is an array
      } else {
        setError('The API did not return an array of courses.');
      }
    } catch (err) {
      setError('Failed to fetch courses');
      console.error('Error fetching courses:', err);
    }
  };

  const handleDelete = async (mongoId: string) => {
    try {
        const response = await axios.delete(`http://localhost:3001/courses/${mongoId}`);
        if (response.status === 200) {
            // If successful, remove the course from the list based on _id
            setCourses(prevCourses => prevCourses.filter(course => course._id !== mongoId));
        } else {
            setError('Failed to delete course');
        }
    } catch (err) {
      console.error('Error during delete request:', err); // Log the full error object
      if (axios.isAxiosError(err)) {
        console.error('Axios error response:', err.response); // Log the response from the server
        // Display a detailed error message if available
        setError(`Failed to delete course: ${err.response?.data?.message || err.message}`);
      } else {
        console.error('Non-Axios error:', err);
        setError('Failed to delete course');
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, backgroundColor: '#f8f8f8' }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: '600', color: '#444', textAlign: 'center', fontFamily: '"Lora", serif' }}>
            Courses
          </Typography>
          <Link href="/courses/create">
            <Button variant="contained" color="primary" sx={{
              mb: 3, 
              borderRadius: '25px', 
              boxShadow: '0px 8px 15px rgba(0, 51, 102, 0.2)',
              '&:hover': {
                backgroundColor: '#0277bd',
                boxShadow: '0px 12px 25px rgba(0, 51, 102, 0.4)',
              }
            }}>
              Create New Course
            </Button>
          </Link>
        </Grid>

        {error && (
          <Grid item xs={12}>
            <Typography color="error" sx={{ fontSize: '1.1rem', fontWeight: '600', textAlign: 'center', fontFamily: '"Poppins", sans-serif' }}>
              {error}
            </Typography>
          </Grid>
        )}

        {Array.isArray(courses) && courses.length > 0 ? (
          courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course._id}> 
              <Card sx={{
                p: 3, 
                borderRadius: 4, 
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', 
                transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
                '&:hover': { 
                  transform: 'scale(1.05)', 
                  boxShadow: '0px 12px 25px rgba(0, 51, 102, 0.3)', 
                }
              }}>
                <Typography variant="h5" gutterBottom sx={{
                  fontWeight: 'bold', 
                  color: '#1976d2', 
                  fontFamily: '"Poppins", sans-serif', 
                  letterSpacing: '1px'
                }}>
                  {course.title}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{
                  marginBottom: '0.5rem', 
                  lineHeight: '1.7', 
                  fontFamily: '"Roboto", sans-serif', 
                  fontSize: '0.95rem'
                }}>
                  <strong>Description:</strong> {course.description}
                </Typography>

                <Typography variant="body2" sx={{
                  marginBottom: '0.5rem', 
                  fontFamily: '"Roboto", sans-serif', 
                  fontSize: '0.95rem'
                }}>
                  <strong>Category:</strong> {course.category}
                </Typography>

                <Typography variant="body2" sx={{
                  marginBottom: '0.5rem', 
                  fontFamily: '"Roboto", sans-serif', 
                  fontSize: '0.95rem'
                }}>
                  <strong>Difficulty Level:</strong> {course.difficulty_level}
                </Typography>

                <Typography variant="body2" sx={{
                  marginBottom: '0.5rem', 
                  fontFamily: '"Roboto", sans-serif', 
                  fontSize: '0.95rem'
                }}>
                  <strong>Created By:</strong> {course.created_by}
                </Typography>

                <Typography variant="body2" sx={{
                  marginBottom: '0.5rem', 
                  fontFamily: '"Roboto", sans-serif', 
                  fontSize: '0.95rem'
                }}>
                  <strong>Current Version:</strong> {course.current_version}
                </Typography>

                <Typography variant="body2" sx={{
                  marginBottom: '0.5rem', 
                  fontFamily: '"Roboto", sans-serif', 
                  fontSize: '0.95rem'
                }}>
                  <strong>Available:</strong> {course.is_available ? 'Yes' : 'No'}
                </Typography>

                {/* Display multimedia resources */}
                {course.multimedia_resources && course.multimedia_resources.length > 0 && (
                  <div style={{ marginTop: '1rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                    <strong>Multimedia Resources:</strong>
                    {course.multimedia_resources.map((resource, index) => (
                      <div key={index} style={{ marginTop: '0.5rem' }}>
                        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                          {resource.filePath}
                        </Typography>

                        {/* Flag Resource Button */}
                        <FlagResourceButton 
                          courseId={course._id}  // Pass courseId (Mongo ID)
                          resourcePath={resource.filePath}  // Pass resourcePath
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ marginTop: '1rem' }}>
                  <Link href={`/courses/edit/${course._id}`}> 
                    <Button variant="outlined" sx={{
                      mr: 1, 
                      borderRadius: '20px', 
                      borderColor: '#1976d2', 
                      color: '#1976d2',
                      '&:hover': { 
                        borderColor: '#0288d1', 
                        color: '#0288d1', 
                      }
                    }}>
                      Edit
                    </Button>
                  </Link>

                  <Button 
                    variant="outlined" 
                    color="error" 
                    sx={{
                      borderRadius: '20px', 
                      borderColor: '#d32f2f', 
                      color: '#d32f2f', 
                      '&:hover': { 
                        borderColor: '#c62828', 
                        color: '#c62828', 
                      }
                    }}
                    onClick={() => handleDelete(course._id)} 
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', fontStyle: 'italic', fontSize: '1.1rem' }}>
              No courses available.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
