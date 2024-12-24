import { NextResponse } from 'next/server';
import { forumService } from '@/lib/services/forum.service';

export async function GET(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const threads = await forumService.getThreadsByCourse(params.courseId);
    return NextResponse.json({ success: true, data: threads });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch threads' },
      { status: 500 }
    );
  }
}