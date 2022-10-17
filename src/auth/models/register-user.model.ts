import { IsEmail, IsString } from "class-validator";

export class RegisterUserModel {

  @IsString()
  fullName: string

  @IsEmail()
  email: string

  @IsString()
  password: string
}
