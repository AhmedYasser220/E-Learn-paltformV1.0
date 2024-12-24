import { NextResponse } from 'next/server';
import { backupService } from '@/lib/services/backup.service';

export async function POST() {
  try {
    await backupService.scheduleBackup();
    return NextResponse.json({ success: true, message: 'Backup scheduled successfully' });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to schedule backup' },
      { status: 500 }
    );
  }
}