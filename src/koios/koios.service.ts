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
}
