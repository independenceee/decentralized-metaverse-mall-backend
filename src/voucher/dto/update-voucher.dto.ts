import { StatusVoucher } from "@prisma/client";
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
