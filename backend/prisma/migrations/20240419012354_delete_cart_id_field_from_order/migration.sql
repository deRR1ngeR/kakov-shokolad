/*
  Warnings:

  - You are about to drop the column `cartId` on the `order` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "order_cartId_key";

-- AlterTable
ALTER TABLE "order" DROP COLUMN "cartId";
