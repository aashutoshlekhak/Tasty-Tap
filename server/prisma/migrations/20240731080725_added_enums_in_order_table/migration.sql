/*
  Warnings:

  - The `delivery_status` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `payment_status` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "payment_status" AS ENUM ('PENDING', 'PAID');

-- CreateEnum
CREATE TYPE "delivery_status" AS ENUM ('PENDING', 'DISPATCHED', 'DELIVERED');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "delivery_status",
ADD COLUMN     "delivery_status" "delivery_status" NOT NULL DEFAULT 'PENDING',
DROP COLUMN "payment_status",
ADD COLUMN     "payment_status" "payment_status" NOT NULL DEFAULT 'PENDING';
