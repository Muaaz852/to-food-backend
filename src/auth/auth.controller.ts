import { AuthService } from "./auth.service";
import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { RegisterUserModel } from "./models/register-user.model";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('register')
  async registerUser(@Body() registerUserModel: RegisterUserModel) {
    return this.authService.registerUser(registerUserModel);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
}
