import { NestFactory } from "@nestjs/core";
import * as express from "express";
import { join } from "path";
import { AppModule } from "./app.module";

(async function start() {
    const app = await NestFactory.create(AppModule, { cors: true });
    app.setGlobalPrefix("api/v1");
    app.use("/public", express.static(join(__dirname, "..", "public")));
    await app.listen(5000);
})();
