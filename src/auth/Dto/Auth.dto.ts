import { Expose } from "class-transformer"
import { IsEmail, IsNotEmpty,Matches, MinLength, } from "class-validator"
export class RegisterDTO {
    @Expose()
    @IsNotEmpty()
    name:string

    @Expose()
    @IsNotEmpty()
    @Matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/)
    phone:string

    @Expose()
    @IsEmail()
    @IsNotEmpty()
    email:string

    @Expose()
    @MinLength(6)
    @IsNotEmpty()
    password:string

    @Expose()
    status:number
}

export class LoginDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @MinLength(6)
    password:string
}