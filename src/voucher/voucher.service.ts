import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateVoucherDto, UpdateVoucherDto } from "./dto";
type StatusVoucher = "USED" | "FREE";

@Injectable()
export class VoucherService {
    constructor(private prisma: PrismaService) {}

    async getAllVouchers({ status, page, pageSize }: { status: string; page: number; pageSize: number }) {
        const totalVoucher = await this.prisma.voucher.count();
        const totalPage = Math.ceil(totalVoucher / pageSize);
        const vouchers = await this.prisma.voucher.findMany({
            where: { status: status as StatusVoucher },
            skip: (page - 1) * pageSize,
            take: Number(pageSize),
        });

        return { vouchers, totalPage };
    }

    async getVoucherById({ id }: { id: string }) {
        const voucher = await this.prisma.voucher.findFirst({
            where: { id: id },
        });
        if (!voucher) throw new NotFoundException("Voucher not found");
        return voucher;
    }

    async createVoucher({ dto }: { dto: CreateVoucherDto[] }) {
        await this.prisma.voucher.createMany({
            data: dto,
        });
    }

    async updateVoucher({ id, dto }: { id: string; dto: UpdateVoucherDto }) {
        const existVoucher = await this.getVoucherById({ id: id });
        return await this.prisma.voucher.update({
            where: { id: existVoucher.id },
            data: { ...dto },
        });
    }

    async deleteVoucher({ id }: { id: string }) {
        const existVoucher = await this.getVoucherById({ id: id });
        await this.prisma.voucher.delete({ where: { id: existVoucher.id } });
    }

    async getVoucherWalletAddress({ walletAddress }: { walletAddress: string }) {
        const account = await this.prisma.account.findFirst({
            where: {
                walletAddress: walletAddress,
            },
        });
        const existVouchers = await this.prisma.accountVoucher.findMany({
            where: {
                accountId: account.id,
            },
            include: {
                voucher: true,
            },
        });

        if (existVouchers.length > 0) {
            return existVouchers;
        }
        const freeVoucher = await this.prisma.voucher.findFirst({
            where: {
                status: "FREE",
            },
        });
        await this.prisma.accountVoucher.create({
            data: {
                accountId: account.id,
                voucherId: freeVoucher.id,
            },
        });
        return [freeVoucher];
    }
}
