import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
    Patch,
    HttpCode,
    HttpStatus,
    Body,
    Param,
    Get,
    Delete,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { storageConfig } from "src/helpers/config";
import { FounderService } from "./founder.service";
import { CreateFounderDto, EditFounderDto } from "./dto";

@Controller("founder")
export class FounderController {
    constructor(private founderService: FounderService) {}

    @HttpCode(HttpStatus.OK)
    @Get()
    getFounders() {
        return this.founderService.getFounders();
    }

    @HttpCode(HttpStatus.OK)
    @Get(":id")
    getFounderById(@Param("id") id) {
        return this.founderService.getFounderById({ id: id });
    }

    @HttpCode(HttpStatus.OK)
    @Post()
    @UseInterceptors(FileInterceptor("image", { storage: storageConfig("founder") }))
    createFounder(@Body() dto: CreateFounderDto, @UploadedFile() file: Express.Multer.File) {
        return this.founderService.createFounder({
            file: file,
            dto: dto,
        });
    }

    @HttpCode(HttpStatus.OK)
    @Patch(":id")
    @UseInterceptors(FileInterceptor("image", { storage: storageConfig("founder") }))
    editFounder(@Param("id") id: string, @Body() dto: EditFounderDto, @UploadedFile() file: Express.Multer.File) {
        return this.founderService.editFounder({
            id: id,
            dto: dto,
            file: file,
        });
    }

    @HttpCode(HttpStatus.OK)
    @Delete(":id")
    deleteFounder(@Param("id") id: string) {
        return this.founderService.deteleFounder({ id: id });
    }
}
