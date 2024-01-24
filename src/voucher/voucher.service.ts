import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class VoucherService {
    constructor(private prisma: PrismaService) {}

    async getAllVouchers() {
        return await this.prisma.voucher.findMany({});
    }

    async getVoucherById(accountId: string, voucherId: string) {}
}
