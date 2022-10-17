import { Injectable } from '@nestjs/common';
import { RegisterUserModel } from "./models/register-user.model";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../core/schemas/user.schema";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt'
import { UserService } from "../user/user.service";
import { UserDto } from "../user/dto/user.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly userService: UserService
  ) {
  }

  async registerUser(registerUserModel: RegisterUserModel) {
    const userModel = await (new this.userModel(registerUserModel));
    await userModel.save();
    return {
      message: 'User created successfully'
    }
  }

  async validateUser(email: string, pass: string): Promise<UserDto> {
    const user = await this.userService.findOneByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return {
        email: user.email,
        role: user.role,
        fullName: user.fullName
      };
    }
    return null;
  }

  // Use bcrypt to hash the password
  static async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}
