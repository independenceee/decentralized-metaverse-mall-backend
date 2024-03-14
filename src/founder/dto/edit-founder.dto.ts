import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class EditFounderDto {
    @IsEmpty()
    @IsString()
    username?: string;

    @IsEmpty()
    @IsString()
    description?: string;

    @IsEmpty()
    @IsString()
    image?: string;

    @IsEmpty()
    @IsString()
    facebookLink?: string;

    @IsEmpty()
    @IsString()
    twitterLink?: string;

    @IsEmpty()
    @IsString()
    linkedinLink?: string;

    @IsEmpty()
    @IsString()
    rrsLink?: string;
}
