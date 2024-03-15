import { IsEmpty, IsString } from "class-validator";

export class UpdateCategoryDto {
    @IsEmpty()
    @IsString()
    name?: string;
}
