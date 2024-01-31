import { Module } from "@nestjs/common";
import { KoiosService } from "./koios.service";
import { KoiosController } from "./koios.controller";

@Module({
    providers: [KoiosService],
    controllers: [KoiosController],
})
export class KoiosModule {}
