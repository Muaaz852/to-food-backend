import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../core/schemas/user.schema";
import { Model } from "mongoose";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>
  ) {
  }

  async findOneByEmail(email: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ email });
  }
}
