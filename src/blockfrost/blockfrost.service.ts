import { BlockFrostAPI } from "@blockfrost/blockfrost-js";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class BlockfrostService extends BlockFrostAPI {
    constructor(config: ConfigService) {
        super({
            projectId: config.get("BLOCKFROST_PROJECT_API_KEY_MAINNET"),
        });
    }

    /**
     * @member ACCOUNT
     */
    async accountDelegationHistory({ stakeAddress }: { stakeAddress: string }) {
        return await this.accountsDelegations(stakeAddress);
    }

    /**
     * @member TRANSACTION
     */
    async specificTransaction({ transactionHash }: { transactionHash: string }) {
        return await this.txs(transactionHash);
    }
}
