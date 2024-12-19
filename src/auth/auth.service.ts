import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LoginDTO, RegisterDTO } from './Dto/Auth.dto';
import { User } from '@prisma/client';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService, private jwtService: JwtService) { }
    register = async (userData: RegisterDTO): Promise<User> => {
        //check: email
        const user = await this.prismaService.user.findUnique({
            where: {
                email: userData.email
            }
        })
        if (user) {
            throw new HttpException({ message: "This is email used" }, HttpStatus.BAD_REQUEST)
        }
        //hash password
        const hashPassword = await hash(userData.password, 10)
        const res = await this.prismaService.user.create({
            data: { ...userData, password: hashPassword }
        })
        return res
    }
    login = async (userData: LoginDTO): Promise<any> => {
        const { email, password } = userData
        console.log("login::",email);
        const user = await this.prismaService.user.findUnique({
            where: {
                email: email
            }
        })
        if (!user) {
            throw new HttpException({ message: "This is email dont exits" }, HttpStatus.UNAUTHORIZED)
        }
        const verify = await compare(password, user.password)
        if (!verify) {
            throw new HttpException({ message: "Password wrong!! please try again" }, HttpStatus.UNAUTHORIZED)
        }
        //generate access token and refresh token
        const payload = { id: user.id, email: user.email }
        const accessToken = await this.jwtService.signAsync(payload, { secret: process.env.ACCESS_TOKEN_SECRET, expiresIn: '1h' })
        const refreshToken = await this.jwtService.signAsync(payload, { secret: process.env.REFRESH_TOKEN_SECRET, expiresIn: '7d' })
        return {
            accessToken,
            refreshToken,
        }
    }
}
