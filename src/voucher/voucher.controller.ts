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
    Query,
} from "@nestjs/common";
import { VoucherService } from "./voucher.service";
import { GetAccount } from "src/account/decorator";
import { Voucher } from "./interfaces";
import { CreateVoucherDto } from "./dto";
import { UpdateVoucherDto } from "./dto/update-voucher.dto";

@Controller("voucher")
export class VoucherController {
    constructor(private voucherService: VoucherService) {}

    @Get()
    getAllVouchers(@Query("status") status: string): Promise<Voucher[]> {
        return this.voucherService.getAllVouchers({ status: status });
    }

    @Post()
    createVoucher(
        @Query("multiple") multiple: string,
        @Body() dto: CreateVoucherDto | CreateVoucherDto[],
    ) {
        return this.voucherService.createVoucher(dto, multiple);
    }

    @Get(":id")
    getVoucherById(@Param("id") id: string) {
        return this.voucherService.getVoucherById(id);
    }

    @Patch(":id")
    updateVoucherById(@Param("id") id: string, @Body() dto: UpdateVoucherDto) {
        return this.voucherService.updateVoucher(id, dto);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(":id")
    deleteVoucherById(@Param("id") id: string) {
        return this.voucherService.deleteVoucher(id);
    }
}
