import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, EditUserDto } from "./dto";

@Controller("user")
export class UserController {
    constructor(private userService: UserService) {}

    @HttpCode(HttpStatus.OK)
    @Get()
    getUsers() {
        return this.userService.getUsers();
    }

    @HttpCode(HttpStatus.OK)
    @Get(":id")
    getUser(@Param("id") id: string) {
        return this.userService.getUser({ id: id });
    }

    @HttpCode(HttpStatus.OK)
    @Post()
    createUser(@Body() dto: CreateUserDto) {
        return this.userService.createUser({ dto: dto });
    }

    @HttpCode(HttpStatus.OK)
    @Patch(":id")
    editUser(@Param("id") id: string, @Body() dto: EditUserDto) {
        return this.userService.updateUser({ id: id, dto: dto });
    }

    @HttpCode(HttpStatus.OK)
    @Delete(":id")
    deleteUser(@Param("id") id: string) {
        return this.userService.deleteUser({ id: id });
    }
}
