import { IsEmail, IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
    @IsEmpty()
    @IsString()
    id?: string;

    @IsEmpty()
    @IsEmail()
    @IsString()
    email?: string;

    @IsEmpty()
    @IsString()
    password?: string;

    @IsEmpty()
    @IsString()
    refreshToken?: string;
}
