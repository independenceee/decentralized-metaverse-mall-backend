import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { Roadmap } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateRoadmapDto, EditRoadmapDto } from "./dto";

@Injectable()
export class RoadmapService {
    constructor(private prismaService: PrismaService) {}

    async getRoadmaps(): Promise<Array<Roadmap>> {
        const roadmaps = await this.prismaService.roadmap.findMany();
        return roadmaps;
    }

    async getRoadmapById({ id }: { id: string }): Promise<Roadmap> {
        const roadmap: Roadmap = await this.prismaService.roadmap.findFirst({
            where: { id: id },
        });
        return roadmap;
    }

    async createRoadmap({ dto }: { dto: CreateRoadmapDto }) {
        const existRoadmap = await this.prismaService.roadmap.findFirst({
            where: { title: dto.title, description: dto.description },
        });

        if (existRoadmap) throw new ForbiddenException("Roadmap has already exists.");
        const roadmap: Roadmap = await this.prismaService.roadmap.create({
            data: { ...dto },
        });
        return roadmap;
    }

    async editRoadmap({ id, dto }: { id: string; dto: EditRoadmapDto }) {
        const existRoadmap: Roadmap = await this.getRoadmapById({ id: id });
        if (!existRoadmap) throw new NotFoundException("Roadmap has already exists.");
        const roadmap: Roadmap = await this.prismaService.roadmap.update({
            where: { id: id },
            data: { ...dto },
        });
        return roadmap;
    }

    async deteleRoadmap({ id }: { id: string }) {
        const existRoadmap: Roadmap = await this.getRoadmapById({ id: id });
        if (!existRoadmap) throw new NotFoundException("Roadmap has already exists.");
        await this.prismaService.roadmap.delete({
            where: { id: id },
        });
    }
}
