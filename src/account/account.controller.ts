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
} from "@nestjs/common";
import { AccountService } from "./account.service";
import { CreateAccountDto } from "./dto";

@Controller("account")
export class AccountController {
    constructor(private accountService: AccountService) {}

    @HttpCode(HttpStatus.OK)
    @Post()
    createAccount(@Body() dto: CreateAccountDto) {
        return this.accountService.createAccount(dto);
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
    @Patch()
    updateAccountById() {}

    @HttpCode(HttpStatus.OK)
    @Delete()
    deleteAccountById() {}
}
