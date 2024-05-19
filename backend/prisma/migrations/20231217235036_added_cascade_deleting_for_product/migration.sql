-- DropForeignKey
ALTER TABLE "cart_product" DROP CONSTRAINT "cart_product_product_id_fkey";

-- AddForeignKey
ALTER TABLE "cart_product" ADD CONSTRAINT "cart_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
