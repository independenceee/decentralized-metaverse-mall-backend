import { Controller, Get, Query } from "@nestjs/common";
import { BlockfrostService } from "./blockfrost.service";

@Controller("blockfrost")
export class BlockfrostController {
    constructor(private blockfrostService: BlockfrostService) {}

    @Get("/account/delegation_history")
    async accountDelegationHistory(@Query("stake_address") stakeAddress: string) {
        return await this.blockfrostService.accountDelegationHistory({ stakeAddress: stakeAddress });
    }

    @Get("/transaction/specific_transaction")
    async specificTransaction(@Query("transaction_hash") transactionHash: string) {
        return await this.blockfrostService.specificTransaction({ transactionHash: transactionHash });
    }
}
