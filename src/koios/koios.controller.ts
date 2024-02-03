import { Controller, Get, Query } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { KoiosService } from "./koios.service";

@Controller("koios")
export class KoiosController {
    constructor(
        private koiosService: KoiosService,
        private config: ConfigService,
    ) {}
}
