-- CreateEnum
CREATE TYPE "review_sentiment" AS ENUM ('POSITIVE', 'NEGATIVE', 'NEUTRAL');

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "review" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 3,
    "sentiment" "review_sentiment" NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);
