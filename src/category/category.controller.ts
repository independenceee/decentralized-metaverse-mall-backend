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
import { CategoryService } from "./category.service";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { storageConfig } from "src/helpers/config";

@Controller("category")
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @HttpCode(HttpStatus.OK)
    @Get()
    getCategories() {
        return this.categoryService.getCategories();
    }

    @HttpCode(HttpStatus.OK)
    @Get(":id")
    getCategory(@Param("id") id: string) {
        return this.categoryService.getCategory({ id: id });
    }

    @HttpCode(HttpStatus.OK)
    @Post()
    @UseInterceptors(FileInterceptor("image", { storage: storageConfig("category") }))
    createCategory(@Body() dto: CreateCategoryDto, @UploadedFile() files: Express.Multer.File) {
        console.log(files);
        return this.categoryService.createCategory({ dto: dto });
    }

    @HttpCode(HttpStatus.OK)
    @Patch(":id")
    @UseInterceptors(FileInterceptor("image", { storage: storageConfig("category") }))
    editCategory(@Param("id") id: string, @Body() dto: UpdateCategoryDto, @UploadedFile() files: Express.Multer.File) {
        this.categoryService.updateCategory({ id: id, dto: dto });
    }

    @HttpCode(HttpStatus.OK)
    @Delete(":id")
    deleteCategory(@Param("id") id: string) {
        this.categoryService.deleteCategory({ id: id });
    }
}
