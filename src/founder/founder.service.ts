import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateFounderDto, EditFounderDto } from "./dto";
import { Founder } from "@prisma/client";

@Injectable()
export class FounderService {
    constructor(private prismaService: PrismaService) {}

    async getFounders(): Promise<Array<Founder>> {
        const founders: Founder[] = await this.prismaService.founder.findMany();
        return founders;
    }

    async getFounderById({ id }: { id: string }): Promise<Founder> {
        const founder = await this.prismaService.founder.findFirst({
            where: {
                id: id,
            },
        });
        return founder;
    }

    async createFounder({ file, dto }: { file: Express.Multer.File; dto: CreateFounderDto }) {
        try {
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
        } catch (error) {
            console.log(error);
        } finally {
        }
    }

    async editFounder({ id, file, dto }: { id: string; file: Express.Multer.File; dto: EditFounderDto }) {
        try {
            const existFounder = await this.getFounderById({ id: id });

            if (!existFounder) {
                return;
            }

            const founder = await this.prismaService.founder.update({
                where: {
                    id: id,
                },
                data: {
                    username: dto.username ? dto.username : existFounder.username,
                    description: dto.description ? dto.description : existFounder.description,
                    image: file.filename ? file.filename : existFounder.image,
                    facebookLink: dto.facebookLink ? dto.facebookLink : existFounder.facebookLink,
                    linkedinLink: dto.linkedinLink ? dto.linkedinLink : existFounder.linkedinLink,
                    twitterLink: dto.twitterLink ? dto.twitterLink : existFounder.twitterLink,
                    rrsLink: dto.rrsLink ? dto.rrsLink : existFounder.rrsLink,
                },
            });

            return founder;
        } catch (error) {
            console.log(error);
        } finally {
        }
    }

    async deteleFounder({ id }: { id: string }) {
        await this.prismaService.founder.delete({
            where: { id: id },
        });
    }
}
