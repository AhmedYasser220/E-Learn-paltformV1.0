// src/app/api/courses/route.ts

import { NextResponse } from 'next/server';
import axios from 'axios';

const BASE_URL = 'http://localhost:4000'; // Replace with your backend base URL

export async function GET() {
  try {
    const response = await axios.get(`${BASE_URL}/courses/courses`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}


export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params; // Extract course ID from the route
  const updateData = await req.json(); // Parse the request body

  try {
    const response = await axios.put(`${BASE_URL}/courses/${id}`, updateData);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json({ error: 'Failed to update course' }, { status: 500 });
  }
}