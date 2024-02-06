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

    async createAccount({ dto }: { dto: AccountDto }) {
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

    async getAllAccounts({ page, pageSize }: { page: number; pageSize: number }) {
        const totalAccount = await this.prisma.account.count();
        const totalPage = Math.ceil(totalAccount / pageSize);
        const accounts = await this.prisma.account.findMany({
            skip: (page - 1) * pageSize,
            take: Number(pageSize),
        });

        return { accounts, totalPage };
    }

    async getAccountById(accountId: string) {
        return await this.prisma.account.findFirst({
            where: { id: accountId },
        });
    }

    async updateAccount() {}

    async deleteAccount() {}
}
