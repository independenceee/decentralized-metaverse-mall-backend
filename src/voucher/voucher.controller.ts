import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res } from "@nestjs/common";
import { VoucherService } from "./voucher.service";
import { Voucher } from "./interfaces";
import { CreateVoucherDto } from "./dto";
import { UpdateVoucherDto } from "./dto/update-voucher.dto";
import { Response } from "express";

@Controller("voucher")
export class VoucherController {
    constructor(private voucherService: VoucherService) {}

    @Get()
    getAllVouchers(
        @Query("status") status: string,
        @Query("page") page: number = 1,
        @Query("pageSize") pageSize: number = 12,
    ): Promise<{ totalPage: number; vouchers: Array<Voucher> }> {
        return this.voucherService.getAllVouchers({ status: status, page: page, pageSize: pageSize });
    }

    // @Post()
    // createVoucher(@Body() dto: CreateVoucherDto[], @Res() response: Response) {
    //     return this.voucherService.createVoucher({ dto: dto });
    // }

    @Get(":id")
    getVoucherById(@Param("id") id: string) {
        return this.voucherService.getVoucherById({ voucherId: id });
    }

    @Patch(":id")
    updateVoucherById(@Param("id") id: string, @Body() dto: UpdateVoucherDto) {
        return this.voucherService.updateVoucher({ voucherId: id, dto: dto });
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(":id")
    deleteVoucherById(@Param("id") id: string, @Res() response: Response) {
        return this.voucherService.deleteVoucher({ response: response, voucherId: id });
    }

    @Get("address")
    getVoucherWalletAddress(@Query("wallet_address") walletAddress: string) {
        return this.voucherService.getVoucherWalletAddress({ walletAddress: walletAddress });
    }
}
