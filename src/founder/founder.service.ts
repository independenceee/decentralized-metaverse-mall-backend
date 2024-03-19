import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateFounderDto, EditFounderDto } from "./dto";
import { Founder } from "@prisma/client";

@Injectable()
export class FounderService {
    constructor(private prismaService: PrismaService) {}

    async getFounders(): Promise<Array<Founder>> {
        const founders: Array<Founder> = await this.prismaService.founder.findMany();
        return founders;
    }

    async getFounderById({ id }: { id: string }): Promise<Founder> {
        if (!id) {
            throw new BadRequestException("Founder Id has been required", {
                cause: new Error(),
                description: "Founder ID has been required",
            });
        }

        const founder = await this.prismaService.founder.findFirst({
            where: { id: id },
        });

        if (!founder) {
            throw new NotFoundException("Founder is not found", {
                cause: new Error(),
                description: "Founder is not found",
            });
        }

        return founder;
    }

    async createFounder({ file, dto }: { file: Express.Multer.File; dto: CreateFounderDto }) {
        const existFounder = await this.prismaService.founder.findFirst({
            where: { username: dto.username },
        });

        if (existFounder) {
            throw new ForbiddenException("User already exists", {
                cause: new Error(),
                description: "User already exists",
            });
        }

        const founder = await this.prismaService.founder.create({
            data: {
                username: dto.username,
                description: dto.description,
                image: file.filename,
                facebookLink: dto.facebookLink,
                linkedinLink: dto.linkedinLink,
                twitterLink: dto.twitterLink,
                rrsLink: dto.rrsLink,
            },
        });

        return founder;
    }

    async editFounder({ id, file, dto }: { id: string; file?: Express.Multer.File; dto: EditFounderDto }) {
        const existFounder = await this.getFounderById({ id: id });
        const founder = await this.prismaService.founder.update({
            where: { id: existFounder.id },
            data: {
                username: dto.username ? dto.username : existFounder.username,
                description: dto.description ? dto.description : existFounder.description,
                image: file ? file.filename : existFounder.image,
                facebookLink: dto.facebookLink ? dto.facebookLink : existFounder.facebookLink,
                linkedinLink: dto.linkedinLink ? dto.linkedinLink : existFounder.linkedinLink,
                twitterLink: dto.twitterLink ? dto.twitterLink : existFounder.twitterLink,
                rrsLink: dto.rrsLink ? dto.rrsLink : existFounder.rrsLink,
            },
        });

        return founder;
    }

    async deteleFounder({ id }: { id: string }) {
        const existFounder = await this.getFounderById({ id: id });
        await this.prismaService.founder.delete({
            where: { id: existFounder.id },
        });
    }
}
