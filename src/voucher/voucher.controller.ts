import {
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
} from "@nestjs/common";
import { VoucherService } from "./voucher.service";
import { GetAccount } from "src/account/decorator";
import { Voucher } from "./interfaces";

@Controller("voucher")
export class VoucherController {
    constructor(private voucherService: VoucherService) {}

    @Get()
    getAllVouchers(): Promise<Voucher[]> {
        return this.voucherService.getAllVouchers();
    }

    @Get(":id")
    getVoucherById(
        @GetAccount("id") accountId: string,
        @Param("id") voucherId: string,
    ) {
        return this.voucherService.getVoucherById(accountId, voucherId);
    }

    @Post()
    createVoucher() {}

    @Patch(":id")
    updateVoucherById() {}

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(":id")
    deleteVoucherById() {}
}
