import { Module } from "@nestjs/common";
import { BlockfrostService } from "./blockfrost.service";
import { BlockfrostController } from "./blockfrost.controller";

@Module({
    providers: [BlockfrostService],
    controllers: [BlockfrostController],
})
export class BlockfrostModule {}
