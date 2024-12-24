import { HttpStatus } from '@nestjs/common';
import { BackupService } from './backup.service';
export declare class BackupController {
    private readonly backupService;
    constructor(backupService: BackupService);
    scheduleBackup(): Promise<{
        success: boolean;
        message: string;
        status: HttpStatus;
    }>;
    getBackups(): Promise<{
        success: boolean;
        data: (import("mongoose").Document<unknown, {}, import("./models/backup.model").Backup> & import("./models/backup.model").Backup & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        status: HttpStatus;
    }>;
}
