import { SetMetadata } from "@nestjs/common";

export const Public = function () {
    return SetMetadata("isPublic", true);
};
