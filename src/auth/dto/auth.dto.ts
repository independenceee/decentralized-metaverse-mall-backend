import { IsEmail, IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
    id?: string;
    @IsEmail()
    email?: string;
    password?: string;
    refreshToken?: string;
}
