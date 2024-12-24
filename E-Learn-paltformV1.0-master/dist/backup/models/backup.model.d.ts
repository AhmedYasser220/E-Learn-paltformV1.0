import { Document, Schema as MongooseSchema } from 'mongoose';
export type BackupDocument = Backup & Document;
export declare class Backup {
    backup_id: string;
    backup_date: Date;
    data_type: any;
    data: Record<string, any>;
}
export declare const BackupSchema: MongooseSchema<Backup, import("mongoose").Model<Backup, any, any, any, Document<unknown, any, Backup> & Backup & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Backup, Document<unknown, {}, import("mongoose").FlatRecord<Backup>> & import("mongoose").FlatRecord<Backup> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
