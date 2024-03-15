/*
  Warnings:

  - You are about to drop the column `imageCategory` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `imageVoucher` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "imageCategory",
DROP COLUMN "imageVoucher",
ADD COLUMN     "descriptionBanner" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "imageBanner" TEXT,
ADD COLUMN     "statusBanner" TEXT,
ADD COLUMN     "subTitle" TEXT[],
ADD COLUMN     "titleBanner" TEXT;
