import { Controller, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { storageConfig } from "src/helpers/config";

@Controller("founder")
export class FounderController {
    @Post("upload")
    @UseInterceptors(FileInterceptor("image", { storage: storageConfig("founder") }))
    uploadImage(@Req() request: any, @UploadedFile() file: Express.Multer.File) {
        console.log(file);
    }
}
