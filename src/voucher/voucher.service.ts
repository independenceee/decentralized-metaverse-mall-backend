import { HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateVoucherDto, UpdateVoucherDto } from "./dto";
import { StatusVoucher } from "@prisma/client";
import { Response } from "express";

@Injectable()
export class VoucherService {
    constructor(private prisma: PrismaService) {}

    async getAllVouchers({ status, page, pageSize }: { status: string; page: number; pageSize: number }) {
        const totalVoucher = await this.prisma.voucher.count();
        const totalPage = Math.ceil(totalVoucher / pageSize);
        const vouchers = await this.prisma.voucher.findMany({
            where: { status: status as StatusVoucher },
            skip: (page - 1) * pageSize,
            take: pageSize,
        });

        return { vouchers, totalPage };
    }

    async getVoucherById({ voucherId }: { voucherId: string }) {
        return await this.prisma.voucher.findFirst({
            where: { id: voucherId },
        });
    }

    async createVoucher({ dto, response }: { dto: CreateVoucherDto[]; response: Response }) {
        try {
            if (dto.length === 0) {
                return response.status(HttpStatus.BAD_REQUEST).json({
                    mesage: "Voucher has been require (status, code)",
                });
            }

            await this.prisma.voucher.createMany({ data: dto });

            return response.status(HttpStatus.OK).json({
                message: "Create voucher successfully",
            });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
        }
    }

    async updateVoucher({
        voucherId,
        dto,
        response,
    }: {
        voucherId: string;
        dto: UpdateVoucherDto;
        response: Response;
    }) {
        try {
            const existVoucher = await this.prisma.voucher.findUnique({ where: { id: voucherId } });
            if (!existVoucher) {
                return response.status(HttpStatus.NOT_FOUND).json({
                    message: "Voucher not found",
                });
            }
            return await this.prisma.voucher.update({
                where: { id: voucherId },
                data: dto,
            });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
        }
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
}
