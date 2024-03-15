import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as argon from "argon2";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private config: ConfigService,
    ) {}

    async register({ dto }: { dto: AuthDto }) {
        const hash = await argon.hash(dto.password);
        const existUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (existUser) {
            throw new ForbiddenException("Email address already exists");
        }
        const user = await this.prisma.user.create({
            data: { email: dto.email, password: hash },
        });
        const tokens = await this.getTokens({ email: user.email, id: user.id });
        await this.updateRefreshToken({ dto: user, refreshToken: tokens.refreshToken });
        return tokens;
    }

    async login({ dto }: { dto: AuthDto }) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user) throw new ForbiddenException("Permission access denied");
        const checkPassword = await argon.verify(user.password, dto.password);
        if (!checkPassword) throw new ForbiddenException("Permission access denied");
        const tokens = await this.getTokens({ id: user.id, email: user.email });
        await this.updateRefreshToken({ dto: user, refreshToken: tokens.refreshToken });
        return tokens;
    }

    async logout({ dto }: { dto: AuthDto }): Promise<boolean> {
        await this.prisma.user.updateMany({
            where: { id: dto.id, refreshToken: { not: null } },
            data: { refreshToken: null },
        });
        return true;
    }

    async refresh({ dto }: { dto: AuthDto }) {
        const user = await this.prisma.user.findFirst({
            where: { id: dto.id },
        });

        if (!user || !user.refreshToken) throw new ForbiddenException("Permission access denied");
        const refreshTokenHash = await argon.verify(user.refreshToken, dto.refreshToken);
        if (!refreshTokenHash) throw new ForbiddenException("Permission access denied");
        const tokens = await this.getTokens({ id: user.id, email: user.email });
        await this.updateRefreshToken({ dto: dto, refreshToken: tokens.refreshToken });
        return tokens;
    }

    async getTokens({ id, email }: { id: string; email: string }) {
        const payload = { id: id, email: email };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.config.get<string>("ACCESSTOKEN_SECRET_KEY"),
                expiresIn: "15m",
            }),
            this.jwtService.signAsync(payload, {
                secret: this.config.get<string>("ACCESSTOKEN_SECRET_KEY"),
                expiresIn: "7d",
            }),
        ]);

        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
        };
    }

    async updateRefreshToken({ dto, refreshToken }: { dto: AuthDto; refreshToken: string }): Promise<void> {
        const hash = await argon.hash(refreshToken);
        await this.prisma.user.update({
            where: { id: dto.id },
            data: { refreshToken: hash },
        });
    }
}
