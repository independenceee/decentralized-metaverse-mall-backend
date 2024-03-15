import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Voucher } from "../interfaces";

interface CustomRequest extends Express.Request {
    voucher: Voucher;
}

export const GetVoucher = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
    const request: CustomRequest = ctx.switchToHttp().getRequest();
    if (data) {
        return request.voucher[data];
    }
    return request.voucher;
});
