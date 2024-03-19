import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    UploadedFile,
    UseInterceptors,
} from "@nestjs/common";
import { BannerService } from "./banner.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { storageConfig } from "src/helpers/config";
import { CreateBannerDto, EditBannerDto } from "./dto";

@Controller("banner")
export class BannerController {
    constructor(private bannerService: BannerService) {}

    @HttpCode(HttpStatus.OK)
    @Get()
    getCategories() {
        return this.bannerService.getBanners();
    }

    @HttpCode(HttpStatus.OK)
    @Get(":id")
    getBanner(@Param("id") id: string) {
        return this.bannerService.getBanner({ id: id });
    }

    @HttpCode(HttpStatus.OK)
    @Post()
    @UseInterceptors(FileInterceptor("image", { storage: storageConfig("image") }))
    createBanner(@Body() dto: CreateBannerDto, @UploadedFile() file: Express.Multer.File) {
        return this.bannerService.createBanner({ dto: dto, file: file });
    }

    @HttpCode(HttpStatus.OK)
    @Patch(":id")
    @UseInterceptors(FileInterceptor("image", { storage: storageConfig("image") }))
    editBanner(@Param("id") id: string, @Body() dto: EditBannerDto, @UploadedFile() file: Express.Multer.File) {
        return this.bannerService.updateBanner({ id: id, dto: dto, file: file });
    }

    @HttpCode(HttpStatus.OK)
    @Delete(":id")
    deleteBanner(@Param("id") id: string) {
        return this.bannerService.deleteBanner({ id: id });
    }
}
