import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { LoginDTO, RegisterDTO } from './Dto/Auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    @Post('register')
    register(@Body() body: RegisterDTO):Promise<User>{
        console.log(body);
        return this.authService.register(body)
    }
    @Post('login')
    login(@Body() body:LoginDTO):Promise<User>{
        return this.authService.login(body)
    }
}
