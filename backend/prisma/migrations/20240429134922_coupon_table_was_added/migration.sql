-- CreateTable
CREATE TABLE "coupon" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "discount_amount" INTEGER NOT NULL,

    CONSTRAINT "coupon_pkey" PRIMARY KEY ("id")
);
