import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Axios } from "axios";

@Injectable()
export class KoiosService extends Axios {
    constructor(config: ConfigService) {
        super({
            baseURL: config.get("KOIOS_RPC_URL_MAINNET"),
        });
    }

    async poolDelegatorsList({ poolBech32 }: { poolBech32: string }) {
        const response = await this.get("/pool_delegators", {
            params: { _pool_bech32: poolBech32 },
        });

        return response.data;

        
    }

    async accountInfomation({ stakeAddress }: { stakeAddress: string }) {
        const response = await this.post("/account_info", undefined, {
            data: {
                _stake_addresses: [stakeAddress],
            },
        });
        return response.data;
    }
}
