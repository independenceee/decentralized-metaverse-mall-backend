import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class SendMailDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    from: string;
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    to: string;
    @IsString()
    @IsNotEmpty()
    subject: string;

    html?: string;
    text?: string;
}
