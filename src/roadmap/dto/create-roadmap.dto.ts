import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoadmapDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    datetime: string;
}
