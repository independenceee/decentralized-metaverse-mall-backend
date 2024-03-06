import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";
import { MailController } from "./mail.controller";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: "smtp.gmail.com",
                auth: {
                    user: "nguyenkhanh17112003@gmail.com",
                    pass: "jtreofpwxawtqolx",
                },
            },
        }),
    ],
    providers: [MailService],
    controllers: [MailController],
})
export class MailModule {}
