import { diskStorage } from "multer";

export const storageConfig = function (folder: string) {
    return diskStorage({
        destination: `public/${folder}`,
        filename: function (request, file, callback) {
            callback(null, Date.now() + "-" + file.originalname);
        },
    });
};
