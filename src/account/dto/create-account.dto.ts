import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAccountDto {
    @IsString()
    @IsNotEmpty({ message: "Wallet address has been required" })
    walletAddress: string;
}
