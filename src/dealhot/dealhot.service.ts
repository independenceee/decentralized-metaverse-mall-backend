import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateDealHotDto, EditDealHotDto } from "./dto";

@Injectable()
export class DealhotService {
    constructor(private prisma: PrismaService) {}

    async getDealHots() {
        const dealHots = await this.prisma.dealHot.findMany();
        return dealHots;
    }

    async getDealHot({ id }: { id: string }) {
        const existDealHot = await this.prisma.dealHot.findFirst({
            where: { id: id },
        });
        if (!existDealHot) throw new NotFoundException("DealHot is not found");
        return existDealHot;
    }

    async createDealHot({ dto, file }: { dto: CreateDealHotDto; file: Express.Multer.File }) {
        const existDealHot = await this.prisma.dealHot.findFirst({
            where: { name: dto.name },
        });
        if (existDealHot) throw new BadRequestException("DealHot already exists");
        const DealHot = await this.prisma.dealHot.create({
            data: { name: dto.name, image: file.filename },
        });
        return DealHot;
    }

    async updateDealHot({ id, dto, file }: { id: string; dto: EditDealHotDto; file: Express.Multer.File }) {
        const existDealHot = await this.getDealHot({ id: id });
        const DealHot = await this.prisma.dealHot.update({
            where: { id: existDealHot.id },
            data: {
                name: dto.name ? dto.name : existDealHot.name,
                image: file ? file.filename : existDealHot.image,
            },
        });
        return DealHot;
    }

    async deleteDealHot({ id }: { id: string }) {
        const existDealHot = await this.getDealHot({ id: id });
        await this.prisma.dealHot.delete({ where: { id: existDealHot.id } });
    }
}
