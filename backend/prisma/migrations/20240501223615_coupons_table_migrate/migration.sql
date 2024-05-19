/*
  Warnings:

  - You are about to drop the column `quantity` on the `coupon` table. All the data in the column will be lost.
  - Added the required column `max_number_of_activations` to the `coupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number_of_activations` to the `coupon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "coupon" DROP COLUMN "quantity",
ADD COLUMN     "max_number_of_activations" INTEGER NOT NULL,
ADD COLUMN     "number_of_activations" INTEGER NOT NULL;
