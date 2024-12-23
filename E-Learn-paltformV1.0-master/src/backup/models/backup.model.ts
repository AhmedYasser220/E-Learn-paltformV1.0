import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type BackupDocument = Backup & Document;

@Schema()
export class Backup {
  @Prop({ type: String })
  backup_id: string;

  @Prop({ type: Date })
  backup_date: Date;

  @Prop({type : String})
  data_type:any

  @Prop({ type: MongooseSchema.Types.Mixed }) 
  data: Record<string, any>;
}

export const BackupSchema = SchemaFactory.createForClass(Backup);
