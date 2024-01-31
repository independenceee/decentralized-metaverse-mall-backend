import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { StatusVoucher } from "@prisma/client";

export class CreateVoucherDto {
    @IsString()
    @IsNotEmpty()
    code: string;

    @IsString()
    @IsNotEmpty()
    status?: StatusVoucher;
}
