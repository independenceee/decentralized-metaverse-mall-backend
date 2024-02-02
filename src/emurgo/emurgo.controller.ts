import { Controller, Get, Query } from "@nestjs/common";
import { EmurgoService } from "./emurgo.service";

@Controller("emurgo")
export class EmurgoController {
    constructor(private emurgoService: EmurgoService) {}

    @Get()
    getStateKey(@Query("wallet_address") walletAddress: string) {
        return this.emurgoService.generateStakeKeyFromAddress({ walletAddress: walletAddress });
    }
}
