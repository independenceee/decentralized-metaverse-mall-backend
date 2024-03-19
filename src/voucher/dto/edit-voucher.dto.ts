type StatusVoucher = "USED" | "FREE";

export class UpdateVoucherDto {
    code?: string;
    status?: StatusVoucher;
    link?: string;
    price?: string;
    categoryId?: string;
}
