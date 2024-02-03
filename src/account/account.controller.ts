import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from "@nestjs/common";
import { AccountService } from "./account.service";
import { CreateAccountDto } from "./dto";

@Controller("account")
export class AccountController {
    constructor(private accountService: AccountService) {}

    @HttpCode(HttpStatus.OK)
    @Post()
    createAccount(@Body() dto: CreateAccountDto) {
        return this.accountService.createAccount({ dto: dto });
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    getAllAccounts(@Query("page") page: number = 1, @Query("pageSize") pageSize: number = 12) {
        return this.accountService.getAllAccounts({ page: page, pageSize: pageSize });
    }

    @HttpCode(HttpStatus.OK)
    @Get(":id")
    getAccountById(@Param("id") accountId: string) {
        return this.accountService.getAccountById(accountId);
    }

    @HttpCode(HttpStatus.OK)
    @Patch(":id")
    updateAccountById() {}

    @HttpCode(HttpStatus.OK)
    @Delete(":id")
    deleteAccountById() {}
}
