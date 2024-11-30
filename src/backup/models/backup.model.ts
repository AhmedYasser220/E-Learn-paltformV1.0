import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Backup {
  @Prop()
  backup_id: string;

  @Prop()
  backup_date: Date;

  @Prop()
  data_type: string;

  @Prop()
  data: object; 
}

export const BackupSchema = SchemaFactory.createForClass(Backup);
