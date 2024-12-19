import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = 'http://localhost:3000'; // NestJS Backend URL

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;

  try {
    switch (method) {
      case 'GET':
        if (query.id) {
          // Handle fetching versions or single course
          const response = await axios.get(`${BASE_URL}/courses/${query.id}/versions`);
          res.status(200).json(response.data);
        } else {
          // Handle fetching all courses
          const response = await axios.get(`${BASE_URL}/courses`);
          res.status(200).json(response.data);
        }
        break;
      case 'PUT':
        const putResponse = await axios.put(`${BASE_URL}/courses/${query.id}`, body);
        res.status(200).json(putResponse.data);
        break;
      default:
        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch or update courses' });
  }
}
