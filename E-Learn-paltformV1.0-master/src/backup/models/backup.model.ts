import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type BackupDocument = Backup & Document;

@Schema()
export class Backup {
  @Prop({ type: String })
  backup_id: string;

  @Prop({ type: Date })
  backup_date: Date;

  // Set default value for data_type as an empty JSON object
  @Prop({type : String})
  data_type:any

  @Prop({ type: MongooseSchema.Types.Mixed }) // Store arbitrary JSON object for data
  data: Record<string, any>;
}

export const BackupSchema = SchemaFactory.createForClass(Backup);
