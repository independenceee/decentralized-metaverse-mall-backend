import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { AccountModule } from "./account/account.module";
import { VoucherModule } from "./voucher/voucher.module";
import { EmurgoModule } from "./emurgo/emurgo.module";
import { BlockfrostModule } from "./blockfrost/blockfrost.module";
import { KoiosModule } from "./koios/koios.module";
import { CategoryModule } from "./category/category.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
        AccountModule,
        VoucherModule,
        EmurgoModule,
        BlockfrostModule,
        KoiosModule,
        CategoryModule,
    ],
})
export class AppModule {}
