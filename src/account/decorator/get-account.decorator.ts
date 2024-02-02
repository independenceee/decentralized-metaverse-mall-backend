import { createParamDecorator, ExecutionContext } from "@nestjs/common";

interface CustomRequest extends Express.Request {
    account: any;
}

export const GetAccount = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
    const request: CustomRequest = ctx.switchToHttp().getRequest();
    if (data) {
        return request.account[data];
    }
    return request.account;
});
