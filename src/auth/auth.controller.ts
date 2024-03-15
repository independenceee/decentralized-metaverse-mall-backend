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
    login(@Body() dto: AuthDto) {
        return this.authService.login({ dto: dto });
    }

    @Public()
    @Post("register")
    @HttpCode(HttpStatus.OK)
    register(@Body() dto: AuthDto) {
        return this.authService.register({ dto: dto });
    }

    @Public()
    @Post("refresh")
    @HttpCode(HttpStatus.OK)
    refresh(@Body() dto: AuthDto) {
        return this.authService.refresh({ dto: dto });
    }

    @Post("logout")
    @HttpCode(HttpStatus.OK)
    logout(@Body() dto: AuthDto) {
        return this.authService.logout({ dto: dto });
    }
}
