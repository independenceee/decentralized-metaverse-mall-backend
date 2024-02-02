import { HttpCode, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AccountDto } from "./dto";
import { EmurgoService } from "src/emurgo/emurgo.service";
import { Response } from "express";

@Injectable({})
export class AccountService {
    constructor(
        private prisma: PrismaService,
        private emurgo: EmurgoService,
    ) {}

    async createAccount({ dto, response }: { dto: AccountDto; response: Response }) {
        if (!dto) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                message: "Wallet address has been required !",
            });
        }

        const existAccount = await this.prisma.account.findUnique({
            where: { walletAddress: dto.walletAddress },
        });

        if (existAccount) {
            return existAccount;
        }

        const stakeKey = this.emurgo.generateStakeKeyFromAddress({ walletAddress: dto.walletAddress });
        const account = await this.prisma.account.create({
            data: { ...dto, stakeKey: stakeKey },
        });
        return account;
    }

    async getAllAccounts() {
        return await this.prisma.account.findMany();
    }

    async getAccountById(accountId: string) {
        return await this.prisma.account.findFirst({
            where: { id: accountId },
        });
    }

    async updateAccount() {}

    async deleteAccount() {}
}
