import * as mongoose from 'mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';

export const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: false },
  phone: { type: Number, required: true },
});

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: number;
}

export class ClientModel {
  id: string;

  @IsNotEmpty()
  name: string;

  @IsEmail(undefined, { message: 'email invalido!' })
  email: string;

  @IsNotEmpty()
  phone: number;
}
