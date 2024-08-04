-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menu_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
