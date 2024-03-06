import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { Mail } from "./interfaces";
@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async send({ to, from, subject, text, html }: Mail) {
        this.mailerService.sendMail({
            to: to,
            from: from,
            subject: subject,
            text: text,
            html: html,
        });
    }
}
