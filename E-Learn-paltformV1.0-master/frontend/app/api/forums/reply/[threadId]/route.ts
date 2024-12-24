import { NextResponse } from 'next/server';
import { forumService } from '@/lib/services/forum.service';

export async function POST(
  request: Request,
  { params }: { params: { threadId: string } }
) {
  try {
    const body = await request.json();
    const { body: replyBody, authorId } = body;
    const reply = await forumService.addReply(params.threadId, replyBody, authorId);
    return NextResponse.json({ success: true, data: reply });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to add reply' },
      { status: 500 }
    );
  }
}