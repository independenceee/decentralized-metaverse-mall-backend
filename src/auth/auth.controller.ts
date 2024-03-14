import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { Public } from "./decorator/public.decorator";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post("login")
    @HttpCode(HttpStatus.OK)
    login(@Body() dto: AuthDto) {}

    @Public()
    @Post("register")
    @HttpCode(HttpStatus.OK)
    register(@Body() dto: AuthDto) {}

    @Public()
    @Post("refresh")
    @HttpCode(HttpStatus.OK)
    refresh(@Body() dto: AuthDto) {}

    @Post("logout")
    @HttpCode(HttpStatus.OK)
    logout(@Body() dto: AuthDto) {}
}
