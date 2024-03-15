/*
  Warnings:

  - You are about to drop the column `description` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `descriptionBanner` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `imageBanner` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `statusBanner` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `subTitle` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `titleBanner` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "description",
DROP COLUMN "descriptionBanner",
DROP COLUMN "imageBanner",
DROP COLUMN "slug",
DROP COLUMN "statusBanner",
DROP COLUMN "subTitle",
DROP COLUMN "titleBanner";
