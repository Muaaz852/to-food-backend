import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from "./auth.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../core/schemas/user.schema";
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";

@Module({
  imports: [
    UserModule,
    PassportModule,
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', async function (next) {
            const user = this;
            if (user.isModified('password')) {
              user.password = await AuthService.hashPassword(user.password);
            }
            next();
          });
          return schema;
        }
      }
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
