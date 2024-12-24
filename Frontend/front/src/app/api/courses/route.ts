// src/app/api/courses/route.ts
import axios from 'axios';

const BASE_URL = 'http://localhost:4000'; // Replace with your backend base URL


export interface Course {
  course_Id: string;
  title: string;
  description: string;
  category: string;
  difficulty_level: string;
  // Add any other fields that your course model may have
}

export interface UpdateCourseDto {
  title?: string;
  description?: string;
  category?: string;
  difficulty_level?: string;
  updated_by?: string; // Optional, default to 'System' if not provided
}


export const getAllCourses = async (): Promise<Course[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/courses/courses`);
    return response.data;
  } catch (error: any) { // Use `any` to bypass the unknown type
    console.error('Error fetching courses:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch courses');
  }
};

export const updateCourse = async (
  course_Id: string,
  updateData: UpdateCourseDto
): Promise<any> => {
  try {
    const response = await axios.put(`${BASE_URL}/courses/${course_Id}`, updateData);
    return response.data;
  } catch (error: any) { // Use `any` to bypass the unknown type
    console.error('Error updating course:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to update course');
  }
};



