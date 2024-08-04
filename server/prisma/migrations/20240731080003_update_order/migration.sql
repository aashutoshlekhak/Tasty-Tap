/*
  Warnings:

  - You are about to drop the column `status` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `total_price` on the `Order` table. All the data in the column will be lost.
  - Added the required column `delivery_status` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_status` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "status",
DROP COLUMN "total_price",
ADD COLUMN     "delivery_status" TEXT NOT NULL,
ADD COLUMN     "payment_status" TEXT NOT NULL;
