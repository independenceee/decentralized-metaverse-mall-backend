import { Controller, Get, Query } from "@nestjs/common";
import { BlockfrostService } from "./blockfrost.service";

@Controller("blockfrost")
export class BlockfrostController {
    constructor(private blockfrostService: BlockfrostService) {}

    @Get("/account/delegation_history")
    async accountDelegationHistory(@Query("stake_address") stakeAddress: string) {
        return await this.blockfrostService.accountDelegationHistory({ stakeAddress: stakeAddress });
    }

    @Get("/account/specific_account")
    async accountSpecific(@Query("stake_address") stakeAddress: string) {
        return await this.blockfrostService.accountSpecificAccount({ stakeAddress: stakeAddress });
    }

    @Get("/account/reward_history")
    async accountRewardHistory(@Query("stake_address") stakeAddress: string) {
        return await this.blockfrostService.accountRewardHistory({ stakeAddress: stakeAddress });
    }
    @Get("/transaction/specific_transaction")
    async specificTransaction(@Query("transaction_hash") transactionHash: string) {
        return await this.blockfrostService.specificTransaction({ transactionHash: transactionHash });
    }

    /* GET TEST ACCOUNT */
    @Get("/account")
    async account(@Query("stake_address") stakeAddress: string) {
        return await this.blockfrostService.account({ stakeAddress: stakeAddress });
    }
}
