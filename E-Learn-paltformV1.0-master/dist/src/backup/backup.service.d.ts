import { Model } from 'mongoose';
import { Backup } from './models/backup.model';
import { User } from '../user/Models/user.model';
export declare class BackupService {
    private backupModel;
    private userModel;
    constructor(backupModel: Model<Backup>, userModel: Model<User>);
    scheduleBackup(): Promise<void>;
    getBackups(): Promise<(import("mongoose").Document<unknown, {}, Backup> & Backup & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    performBackup(): Promise<number>;
}
