import { IsNotEmpty } from "class-validator";

export class AuthDto {
    @IsNotEmpty()
    walletAddress: string;
}
