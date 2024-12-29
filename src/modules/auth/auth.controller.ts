import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDto } from "./dto/signup.dto";
import { ApiTags } from "@nestjs/swagger";
import { SigninDto } from "./dto/signin.dto";

@ApiTags('AuthController')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    async signup(@Body() dto: SignupDto) {
        return await this.authService.signup(dto);
    }

    @Post('signin')
    async signin(@Body() dto: SigninDto) {
        return await this.authService.signin(dto);
    }

    @Get('all-users')
    async getAllUsers() {
        return await this.authService.getAllUsers();
    }

}