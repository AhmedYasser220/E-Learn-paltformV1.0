import { NextResponse } from 'next/server';
import { forumService } from '@/lib/services/forum.service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { courseId, title, authorId } = body;
    const thread = await forumService.createThread(courseId, title, authorId);
    return NextResponse.json({ success: true, data: thread });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to create thread' },
      { status: 500 }
    );
  }
}