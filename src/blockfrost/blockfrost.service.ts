import { BlockFrostAPI } from "@blockfrost/blockfrost-js";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class BlockfrostService extends BlockFrostAPI {
    constructor(config: ConfigService) {
        super({
            // projectId: config.get("BLOCKFROST_PROJECT_API_KEY_MAINNET"),
            projectId: config.get("BLOCKFROST_PROJECT_API_KEY_PREPROD"),
        });
    }

    /**
     * @member ACCOUNT
     */
    async accountDelegationHistory({ stakeAddress }: { stakeAddress: string }) {
        return await this.accountsDelegations(stakeAddress);
    }

    async accountSpecificAccount({ stakeAddress }: { stakeAddress: string }) {
        return this.accounts(stakeAddress);
    }

    async accountRewardHistory({ stakeAddress }: { stakeAddress }) {
        return this.accountsRewards(stakeAddress);
    }

    /**
     * @member TRANSACTION
     */
    async specificTransaction({ transactionHash }: { transactionHash: string }) {
        return await this.txs(transactionHash);
    }

    /* GET TEST ACCOUNT */

    async account({ stakeAddress }: { stakeAddress: string }) {
        const accountsDelegation = await this.accountsDelegations(stakeAddress);
        const specificTransaction = await this.txs(accountsDelegation[0].tx_hash);
        console.log(specificTransaction);
        return;
    }

    /**
     * block_time
     * tx_hash
     * pool_id
     * stake_address
     */
}
