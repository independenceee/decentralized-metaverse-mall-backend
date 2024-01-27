import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateVoucherDto, UpdateVoucherDto } from "./dto";
import { StatusVoucher } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class VoucherService {
    constructor(private prisma: PrismaService) {}

    async getAllVouchers({ status }: { status: string }) {
        return await this.prisma.voucher.findMany({
            where: { status: status as StatusVoucher },
        });
    }

    async getVoucherById(id: string) {
        return await this.prisma.voucher.findFirst({
            where: { id: id },
        });
    }

    async createVoucher(
        dto: CreateVoucherDto | CreateVoucherDto[],
        multiple: string,
    ) {
        try {
            // if (multiple) {
            //     const vouchers = await this.prisma.voucher.createMany({
            //         data: dto,
            //     });
            //     return vouchers;
            // }
            // const voucher = await this.prisma.voucher.create({
            //     data: dto,
            // });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new ForbiddenException("Credentials taken");
                }
            }
            throw Error(error);
        }
    }

    async updateVoucher(id: string, dto: UpdateVoucherDto) {
        try {
            return await this.prisma.voucher.update({
                where: { id: id },
                data: dto,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async deleteVoucher(id: string) {
        return await this.prisma.voucher.delete({
            where: { id: id },
        });
    }
}
