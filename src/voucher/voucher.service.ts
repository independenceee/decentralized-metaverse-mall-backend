import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateVoucherDto, ReceiveVoucherDto, UpdateVoucherDto } from "./dto";
type StatusVoucher = "USED" | "FREE";

@Injectable()
export class VoucherService {
    constructor(private prisma: PrismaService) {}

    async getAllVouchers({
        status,
        page,
        pageSize,
        categoryName,
    }: {
        status: string;
        page: number;
        pageSize: number;
        categoryName: string;
    }) {
        const totalVoucher = await this.prisma.voucher.count();
        const totalPage = Math.ceil(totalVoucher / pageSize);
        const vouchers = await this.prisma.voucher.findMany({
            where: {
                status: status as StatusVoucher,
                categoryName: categoryName as string,
            },
            skip: (page - 1) * pageSize,
            take: Number(pageSize),
        });

        return { vouchers, totalPage };
    }

    async getVoucherByWalletAddress({ walletAddress }: { walletAddress: string }) {
        const existVouchers = await this.prisma.accountVoucher.findMany({
            where: {
                account: { walletAddress: walletAddress },
            },
            include: { voucher: true },
        });
        const vouchers = existVouchers.map((accountVoucher) => accountVoucher.voucher);
        return vouchers;
    }

    async getVoucherById({ id }: { id: string }) {
        const voucher = await this.prisma.voucher.findFirst({
            where: { id: id },
        });
        if (!voucher) throw new NotFoundException("Voucher not found");
        return voucher;
    }

    async createVoucher({ dto }: { dto: CreateVoucherDto[] }) {
        return await this.prisma.voucher.createMany({ data: dto });
    }

    async updateVoucher({ id, dto }: { id: string; dto: UpdateVoucherDto }) {
        const existVoucher = await this.getVoucherById({ id: id });
        return await this.prisma.voucher.update({
            where: { id: existVoucher.id },
            data: {
                categoryName: dto.categoryName ? dto.categoryName : existVoucher.categoryName,
                code: dto.code ? dto.code : existVoucher.code,
                link: dto.link ? dto.link : existVoucher.link,
                price: dto.price ? dto.price : existVoucher.price,
                status: dto.status ? dto.status : existVoucher.status,
            },
        });
    }

    async deleteVoucher({ id }: { id: string }) {
        const existVoucher = await this.getVoucherById({ id: id });
        await this.prisma.voucher.delete({ where: { id: existVoucher.id } });
    }

    async receiveVoucher({ dto }: { dto: ReceiveVoucherDto }) {
        if (!dto.epoch || dto.epoch === 0) return;
        const account = await this.prisma.account.findFirst({
            where: { walletAddress: dto.walletAddress },
        });

        const existVouchers = await this.prisma.accountVoucher.findMany({
            where: { accountId: account.id },
            include: { voucher: true },
        });
        const vouchers = existVouchers.map((accountVoucher) => accountVoucher.voucher);
        if (vouchers.length > 0) {
            return vouchers;
        }
        let price: string;

        if (dto.epoch > 0 && dto.epoch <= 1) price = "100";
        else if (dto.epoch > 1 && dto.epoch <= 2) price = "200";
        else if (dto.epoch > 2) price = "300";
        const freeVoucher = await this.prisma.voucher.findFirst({
            where: {
                status: "FREE",
                categoryName: dto.categoryName,
                price: price,
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
