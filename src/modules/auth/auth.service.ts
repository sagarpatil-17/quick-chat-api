import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma-service/prisma.service";
import { SignupDto } from "./dto/signup.dto";
import { comparePassword, encryptPassword } from "src/helpers/auth.hash";
import { SigninDto } from "./dto/signin.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(private readonly prisma: PrismaService, private jwtService: JwtService) { }

    async signup(dto: SignupDto) {
        const hashedPassword = await encryptPassword(dto.password);

        return this.prisma.users.create({
            data: {
                username: dto.username,
                email: dto.email,
                role: '2',
                password: hashedPassword
            }
        })
    }

    async signin(dto: SigninDto) {
        const data = await this.prisma.users.findUnique({
            where: {
                username: dto.username
            }
        });

        if (!data) {
            throw new NotFoundException('User not found!');
        }

        if (!(await comparePassword(dto.password, data.password))) {
            throw new NotFoundException('password incorrect!');
        }

        const payload = { id: data.id, username: data.username, email: data.email, role: data.role };
        const token = this.jwtService.sign(payload);

        return {
            auth_token: token,
            user_info: data
        }
    }

}