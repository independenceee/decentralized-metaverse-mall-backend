import { IsNotEmpty, IsOptional, IsString } from "class-validator";
type StatusVoucher = "USED" | "FREE";

export class CreateVoucherDto {
    @IsString()
    @IsNotEmpty()
    code: string;

    @IsString()
    @IsNotEmpty()
    status?: StatusVoucher;

    @IsString()
    @IsNotEmpty()
    link: StatusVoucher;

    @IsString()
    @IsNotEmpty()
    categoryId: string;
}
