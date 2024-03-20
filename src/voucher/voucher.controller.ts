import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res } from "@nestjs/common";
import { VoucherService } from "./voucher.service";
import { Voucher } from "./interfaces";
import { CreateVoucherDto, ReceiveVoucherDto } from "./dto";
import { UpdateVoucherDto } from "./dto/edit-voucher.dto";
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

    @Post()
    createVoucher(@Body() dto: CreateVoucherDto[]) {
        return this.voucherService.createVoucher({ dto: dto });
    }

    @Get(":id")
    getVoucherById(@Param("id") id: string) {
        return this.voucherService.getVoucherById({ id: id });
    }

    @Patch(":id")
    updateVoucherById(@Param("id") id: string, @Body() dto: UpdateVoucherDto) {
        return this.voucherService.updateVoucher({ id: id, dto: dto });
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(":id")
    deleteVoucherById(@Param("id") id: string) {
        return this.voucherService.deleteVoucher({ id: id });
    }

    @Post("reciece")
    receiveVoucher(@Body() dto: ReceiveVoucherDto) {
        return this.voucherService.receiveVoucher({ dto: dto });
    }
}
