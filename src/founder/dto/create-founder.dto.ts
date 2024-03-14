import { IsEmpty, IsNotEmpty, IsString, isEmpty, isNotEmpty } from "class-validator";

export class CreateFounderDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    image: string;

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
