/*
  Warnings:

  - Added the required column `code` to the `coupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_active` to the `coupon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "coupon" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL;
