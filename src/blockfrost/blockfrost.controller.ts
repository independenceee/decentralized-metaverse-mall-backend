import { Controller, Get, Query } from "@nestjs/common";
import { BlockfrostService } from "./blockfrost.service";

@Controller("blockfrost")
export class BlockfrostController {
    constructor(private blockfrostService: BlockfrostService) {}

    @Get("/account")
    async account(@Query("stake_address") stakeAddress: string) {
        return await this.blockfrostService.account({ stakeAddress: stakeAddress });
    }
}
