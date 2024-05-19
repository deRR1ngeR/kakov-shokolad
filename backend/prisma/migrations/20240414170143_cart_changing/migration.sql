/*
  Warnings:

  - Added the required column `isOrdered` to the `cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "cart_userId_key";

-- AlterTable
ALTER TABLE "cart" ADD COLUMN     "isOrdered" BOOLEAN NOT NULL;
