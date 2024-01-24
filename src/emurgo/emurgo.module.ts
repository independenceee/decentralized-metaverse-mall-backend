import { Global, Module } from "@nestjs/common";
import { EmurgoService } from "./emurgo.service";
import { EmurgoController } from "./emurgo.controller";

@Global()
@Module({
    providers: [EmurgoService],
    controllers: [EmurgoController],
    exports: [EmurgoService],
})
export class EmurgoModule {}
