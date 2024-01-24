-- CreateTable
CREATE TABLE "AccountVoucher" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "accountId" TEXT NOT NULL,
    "voucherId" TEXT NOT NULL,

    CONSTRAINT "AccountVoucher_pkey" PRIMARY KEY ("accountId","voucherId")
);

-- AddForeignKey
ALTER TABLE "AccountVoucher" ADD CONSTRAINT "AccountVoucher_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountVoucher" ADD CONSTRAINT "AccountVoucher_voucherId_fkey" FOREIGN KEY ("voucherId") REFERENCES "Voucher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
