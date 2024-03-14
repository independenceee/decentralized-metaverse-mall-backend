import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        // private jwt: JwtService,
        private config: ConfigService,
    ) {}

    async connect(dto: AuthDto) {
        const existAccount = await this.prisma.account.findUnique({
            where: {
                walletAddress: dto.walletAddress,
            },
        });

        const { id, walletAddress } = await this.prisma.account.create({
            data: {
                walletAddress: dto.walletAddress,
            },
        });

        // return this.signToken({ id, walletAddress });
    }

    async disconnect(dto: AuthDto) {}

    // async signToken({ walletAddress, id }: { walletAddress: string; id: string }): Promise<{ access_token: string }> {
    //     const payload = { id, walletAddress };
    //     const secret = this.config.get("ACCESS_TOKEN_SECRET");

    //     // const token = await this.jwt.signAsync(payload, {
    //     //     expiresIn: "15m",
    //     //     secret: secret,
    //     // });

    //     return {
    //         // access_token: token,
    //     };
    // }
}
