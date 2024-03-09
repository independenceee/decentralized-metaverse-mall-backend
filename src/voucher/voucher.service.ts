import { HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateVoucherDto, UpdateVoucherDto } from "./dto";
import { Response } from "express";
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

    async getVoucherById({ voucherId }: { voucherId: string }) {
        return await this.prisma.voucher.findFirst({
            where: { id: voucherId },
        });
    }

    // async createVoucher({ dto }: { dto: CreateVoucherDto[] }) {
    //     await this.prisma.voucher.createMany({ data: dto });
    // }

    async updateVoucher({ voucherId, dto }: { voucherId: string; dto: UpdateVoucherDto }) {
        return await this.prisma.voucher.update({
            where: { id: voucherId },
            data: dto,
        });
    }

    async deleteVoucher({ response, voucherId }: { response: Response; voucherId: string }) {
        try {
            const existVoucher = await this.prisma.voucher.findUnique({ where: { id: voucherId } });
            if (!existVoucher) {
                return response.status(HttpStatus.NOT_FOUND).json({
                    message: "Voucher not found",
                });
            }
            await this.prisma.voucher.delete({ where: { id: existVoucher.id } });
            return response.status(HttpStatus.OK).json({ message: "Delete voucher successfully" });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
        }
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
