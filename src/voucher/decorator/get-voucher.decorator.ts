import { createParamDecorator, ExecutionContext } from "@nestjs/common";

interface CustomRequest extends Express.Request {
    voucher: any;
}

export const GetVoucher = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
    const request: CustomRequest = ctx.switchToHttp().getRequest();
    if (data) {
        return request.voucher[data];
    }
    return request.voucher;
});
