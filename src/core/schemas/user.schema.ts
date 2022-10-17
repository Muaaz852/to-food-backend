import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserRoleEnum } from "../user-role.enum";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({
  timestamps: true
})
export class User {
  @Prop({
    type: String,
    required: true
  })
  fullName: string;

  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
    default: UserRoleEnum.USER,
    required: true
  })
  role: UserRoleEnum
}

export const UserSchema = SchemaFactory.createForClass(User);
