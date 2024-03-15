import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto";

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {}

    async getCategories() {
        const categories = await this.prisma.category.findMany();
        return categories;
    }

    async getCategory({ id }: { id: string }) {
        const existCategory = await this.prisma.category.findFirst({
            where: { id: id },
        });
        if (!existCategory) throw new NotFoundException("Category is not found");
        return existCategory;
    }

    async createCategory({ dto }: { dto: CreateCategoryDto }) {
        const existCategory = await this.prisma.category.findFirst({
            where: { name: dto.name },
        });

        if (existCategory) {
            throw new BadRequestException("Category already exists");
        }

        const category = await this.prisma.category.create({
            data: {
                name: dto.name,
            },
        });

        return category;
    }

    async updateCategory({ id, dto }: { id: string; dto: UpdateCategoryDto }) {
        const existCategory = await this.getCategory({ id: id });
        const category = await this.prisma.category.update({
            where: { id: existCategory.id },
            data: { name: dto.name ? dto.name : existCategory.name },
        });
        return category;
    }

    async deleteCategory({ id }: { id: string }) {
        const existCategory = await this.getCategory({ id: id });

        await this.prisma.category.delete({ where: { id: existCategory.id } });
    }
}
