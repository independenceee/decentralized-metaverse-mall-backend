import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto";

@Controller("category")
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Get()
    getCategories() {
        return this.categoryService.getCategories();
    }

    @Get(":id")
    getCategory(@Param("id") id: string) {
        return this.categoryService.getCategory({ id: id });
    }

    @Post()
    createCategory(@Body() dto: CreateCategoryDto) {
        return this.categoryService.createCategory({ dto: dto });
    }

    @Patch(":id")
    updateCategory(@Param("id") id: string, @Body() dto: UpdateCategoryDto) {
        this.categoryService.updateCategory({ id: id, dto: dto });
    }

    @Delete(":id")
    deleteCategory(@Param("id") id: string) {
        this.categoryService.deleteCategory({ id: id });
    }
}
