import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Res } from "@nestjs/common";
import { AccountService } from "./account.service";
import { CreateAccountDto } from "./dto";
import { Response } from "express";

@Controller("account")
export class AccountController {
    constructor(private accountService: AccountService) {}

    @HttpCode(HttpStatus.OK)
    @Post()
    createAccount(@Body() dto: CreateAccountDto, @Res() response: Response) {
        return this.accountService.createAccount({ dto: dto, response: response });
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    getAllAccounts() {
        return this.accountService.getAllAccounts();
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
