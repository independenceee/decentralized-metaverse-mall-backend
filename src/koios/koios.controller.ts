import { Controller, Get, Query } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { KoiosService } from "./koios.service";

@Controller("koios")
export class KoiosController {
    constructor(
        private koiosService: KoiosService,
        private config: ConfigService,
    ) {}

    @Get("/pool/pool_delegators")
    poolDelegatorsList(@Query("pool_bech32") poolBech32: string) {
        return this.koiosService.poolDelegatorsList({ poolBech32: poolBech32 });
    }
}
