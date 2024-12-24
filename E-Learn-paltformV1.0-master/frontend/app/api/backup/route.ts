import { backupService } from '@/lib/services/backup.service';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const backups = await backupService.getBackups();
    return NextResponse.json({ success: true, data: backups });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch backups' },
      { status: 500 }
    );
  }
}