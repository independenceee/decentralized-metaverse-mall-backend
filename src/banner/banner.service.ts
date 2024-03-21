import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateBannerDto, EditBannerDto } from "./dto";

@Injectable()
export class BannerService {
    constructor(private prisma: PrismaService) {}

    async getBanners() {
        const categories = await this.prisma.banner.findMany();
        return categories;
    }

    async getBanner({ id }: { id: string }) {
        const existBanner = await this.prisma.banner.findFirst({
            where: { id: id },
        });
        if (!existBanner) throw new NotFoundException("Banner is not found");
        return existBanner;
    }

    async createBanner({ dto, file }: { dto: CreateBannerDto; file: Express.Multer.File }) {
        const existBanner = await this.prisma.banner.findFirst({
            where: { title: dto.title },
        });
        if (existBanner) throw new BadRequestException("Banner already exists");
        const banner = await this.prisma.banner.create({
            data: {
                title: dto.title,
                image: file.filename,
                description: dto.description,
                link: dto.link,
                categoryName: dto.categoryName,
            },
        });
        return banner;
    }

    async updateBanner({ id, dto, file }: { id: string; dto: EditBannerDto; file: Express.Multer.File }) {
        const existBanner = await this.getBanner({ id: id });
        const Banner = await this.prisma.banner.update({
            where: { id: existBanner.id },
            data: {
                title: dto.title ? dto.title : existBanner.title,
                image: file ? file.filename : existBanner.image,
                description: dto.description ? dto.description : existBanner.description,
                link: dto.link ? dto.link : existBanner.link,
                categoryName: dto.categoryName ? dto.categoryName : existBanner.categoryName,
            },
        });
        return Banner;
    }

    async deleteBanner({ id }: { id: string }) {
        const existBanner = await this.getBanner({ id: id });
        await this.prisma.category.delete({ where: { id: existBanner.id } });
    }
}
