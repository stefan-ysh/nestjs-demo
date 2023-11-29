import { Body, Controller, Post } from "@nestjs/common";
import { Public } from "src/common/public.decorator";

import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-auth.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  // 注册
  @Post("/signup")
  signup(@Body() signupData: CreateAuthDto) {
    return this.authService.signup(signupData);
  }

  // 登录
  @Public()
  @Post("/login")
  login(@Body() loginData: CreateAuthDto) {
    return this.authService.login(loginData);
  }
}
