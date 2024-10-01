import * as mongoose from 'mongoose';
import { IsNotEmpty } from 'class-validator';

export const EnterpriseSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export interface Enterprise {
  name: string;
}

export class EnterpriseModel {
  @IsNotEmpty()
  name: string;
}
