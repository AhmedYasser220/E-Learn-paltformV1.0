'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Course } from '../../types/course'; // Adjust the import to your actual types file
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, FormControlLabel, Checkbox, CircularProgress, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

export default function CreateCoursePage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState<Course>({
    _id: '',
    course_Id: '',
    title: '',
    description: '',
    category: '',
    difficulty_level: '',
    created_by: '',
    current_version: 1,
    is_available: true,
    multimedia_resources: [],
    versions: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle select changes for difficulty level
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle checkbox change for availability
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, is_available: e.target.checked }));
  };

  // Handle multimedia file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const newMultimedia = {
        filePath: URL.createObjectURL(file), // You can store the actual file or its URL here
        isOutdated: false,
      };
      setFormData((prev) => ({
        ...prev,
        multimedia_resources: [newMultimedia],
      }));
    }
  };

  // Submit form to backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create course');
      }

      // Redirect after successful creation
      router.push('/courses');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-10 bg-gradient-to-r from-gray-100 via-gray-300 to-gray-400 rounded-2xl shadow-xl">
      <Typography variant="h4" className="text-center text-gray-800 font-bold tracking-wide mb-8">Create New Course</Typography>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 shadow-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <TextField
            label="Course Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            color="primary"
            className="focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
            required
          />
        </div>

        <div>
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            color="primary"
            multiline
            rows={4}
            className="focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
            required
          />
        </div>

        <div>
          <TextField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            color="primary"
            className="focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
            required
          />
        </div>

        <div>
          <FormControl fullWidth required variant="outlined" color="primary">
            <InputLabel>Difficulty Level</InputLabel>
            <Select
              name="difficulty_level"
              value={formData.difficulty_level}
              onChange={handleSelectChange}
              label="Difficulty Level"
              className="focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
            >
              <MenuItem value="Beginner">Beginner</MenuItem>
              <MenuItem value="Intermediate">Intermediate</MenuItem>
              <MenuItem value="Advanced">Advanced</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div>
          <TextField
            label="Created By"
            name="created_by"
            value={formData.created_by}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            color="primary"
            className="focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
            required
          />
        </div>

        {/* Add current version field */}
        <div>
          <TextField
            label="Current Version"
            name="current_version"
            value={formData.current_version}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            color="primary"
            className="focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
            disabled
          />
        </div>

        <div className="flex items-center">
          <FormControlLabel
            control={<Checkbox checked={formData.is_available} onChange={handleCheckboxChange} />}
            label="Make Available"
            className="ml-2 text-gray-600"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Upload Multimedia Resource</label>
          <input
            type="file"
            accept="image/*,video/*,application/pdf"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 file:py-3 file:px-6 file:border file:border-gray-300 file:rounded-xl file:bg-gray-50 file:text-sm file:font-semibold file:text-teal-700 hover:file:bg-teal-200 transition-all duration-300"
          />
          {formData.multimedia_resources.length > 0 && (
            <div className="mt-2 text-sm text-gray-600">
              <p>File selected: {formData.multimedia_resources[0]?.filePath?.split('/').pop()}</p>
            </div>
          )}
        </div>

        <div>
          <Button
            type="submit"
            disabled={loading}
            variant="contained"
            color="primary"
            fullWidth
            className="py-3 mt-4 hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-500 transition-all duration-300"
          >
            {loading ? (
              <CircularProgress size={24} className="text-white" />
            ) : (
              'Create Course'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
