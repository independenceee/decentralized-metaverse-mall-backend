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
import { DealhotService } from "./dealhot.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { storageConfig } from "src/helpers/config";
import { CreateDealHotDto, EditDealHotDto } from "./dto";

@Controller("dealhot")
export class DealhotController {
    constructor(private dealHotService: DealhotService) {}

    @HttpCode(HttpStatus.OK)
    @Get()
    getDealHots() {
        return this.dealHotService.getDealHots();
    }

    @HttpCode(HttpStatus.OK)
    @Get(":id")
    getCategory(@Param("id") id: string) {
        return this.dealHotService.getDealHot({ id: id });
    }

    @HttpCode(HttpStatus.OK)
    @Post()
    @UseInterceptors(FileInterceptor("image", { storage: storageConfig("dealhot") }))
    createCategory(@Body() dto: CreateDealHotDto, @UploadedFile() file: Express.Multer.File) {
        return this.dealHotService.createDealHot({ dto: dto, file: file });
    }

    @HttpCode(HttpStatus.OK)
    @Patch(":id")
    @UseInterceptors(FileInterceptor("image", { storage: storageConfig("dealhot") }))
    editCategory(@Param("id") id: string, @Body() dto: EditDealHotDto, @UploadedFile() file: Express.Multer.File) {
        return this.dealHotService.updateDealHot({ id: id, dto: dto, file: file });
    }

    @HttpCode(HttpStatus.OK)
    @Delete(":id")
    deleteCategory(@Param("id") id: string) {
        return this.dealHotService.deleteDealHot({ id: id });
    }
}
