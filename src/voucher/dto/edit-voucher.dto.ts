type StatusVoucher = "USED" | "FREE";
import { IsOptional, IsString } from "class-validator";

export class UpdateVoucherDto {
    @IsString()
    @IsOptional()
    code?: string;

    @IsString()
    @IsOptional()
    status?: StatusVoucher;

    @IsString()
    @IsOptional()
    link?: string;
}
