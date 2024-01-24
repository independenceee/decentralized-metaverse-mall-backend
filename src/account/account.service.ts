import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AccountDto } from "./dto";
import { EmurgoService } from "src/emurgo/emurgo.service";

@Injectable({})
export class AccountService {
    constructor(
        private prisma: PrismaService,
        private emurgo: EmurgoService,
    ) {}

    async createAccount(dto: AccountDto) {
        const existAccount = await this.prisma.account.findUnique({
            where: { walletAddress: dto.walletAddress },
        });
        if (existAccount) return existAccount;
        const stakeKey = this.emurgo.generateStakeKeyFromAddress(
            dto.walletAddress,
        );
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
