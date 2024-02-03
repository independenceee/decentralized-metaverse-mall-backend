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

    async account({ stakeAddress }: { stakeAddress: string }) {
        const accountsDelegation = await this.accountsDelegations(stakeAddress);
        const specificTransaction = await this.txs(accountsDelegation[0].tx_hash);
        const accountRewardHistory = await this.accountsRewards(stakeAddress);

        return {
            tx_hash: accountsDelegation[0].tx_hash,
            pool_id: accountsDelegation[0].pool_id,
            block_time: specificTransaction.block_time,
            stake_address: stakeAddress,
            epochs: accountRewardHistory,
        };
    }
}
