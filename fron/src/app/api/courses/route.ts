/* eslint-disable @typescript-eslint/no-unused-vars */
export async function GET() {
    try {
      const response = await fetch('http://localhost:3001/course', {
        next: { revalidate: 0 }
      });
      const data = await response.json();
      return Response.json(data);
    } catch (error) {
      return Response.json({ error: 'Failed to fetch courses' }, { status: 500 });
    }
  }
  