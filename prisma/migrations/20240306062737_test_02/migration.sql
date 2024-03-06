/*
  Warnings:

  - You are about to drop the column `email` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "email",
DROP COLUMN "userName";
