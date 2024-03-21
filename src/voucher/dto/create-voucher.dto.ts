type StatusVoucher = "USED" | "FREE";

export class CreateVoucherDto {
    code: string;
    status?: StatusVoucher;
    link: StatusVoucher;
    categoryName: string;
}
