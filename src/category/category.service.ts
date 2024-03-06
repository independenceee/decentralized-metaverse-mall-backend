import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto";
import slugify from "slugify";
import e from "express";

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {}

    async getCategories() {
        const categories = await this.prisma.category.findMany();
        return {
            categories,
        };
    }

    async getCategory({ id }: { id: string }) {
        const existCategory = await this.prisma.category.findFirst({
            where: { id: id },
        });

        return existCategory;
    }

    async createCategory({ dto }: { dto: CreateCategoryDto }) {
        const existCategory = await this.prisma.category.findFirst({
            where: { name: dto.name },
        });

        if (existCategory) {
            return existCategory;
        }

        const slug = slugify(dto.name);
        const category = await this.prisma.category.create({
            data: {
                name: dto.name,
                slug: slug,
            },
        });

        return category;
    }

    async updateCategory({ id, dto }: { id: string; dto: UpdateCategoryDto }) {
        const existCategory = await this.getCategory({ id: id });

        if (!existCategory) {
            return;
        }

        const category = await this.prisma.category.update({
            where: { id: id },
            data: {
                name: dto.name ? dto.name : existCategory.name,
                slug: dto.name ? slugify(dto.name) : existCategory.slug,
            },
        });

        return category;
    }

    async deleteCategory({ id }: { id: string }) {
        const existCategory = await this.getCategory({ id: id });

        if (!existCategory) {
            return;
        }

        await this.prisma.category.delete({ where: { id: id } });
    }
}
