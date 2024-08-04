import prisma from "../db/prisma.db";
import { IReview } from "../interface/review.interface";

export function createReview(reviewData: IReview) {
  const { user_id, menu_id, review, rating, sentiment } = reviewData;

  return prisma.review.create({
    data: {
      user_id,
      menu_id,
      review,
      rating,
      sentiment,
    },
  });
}

export function findReviewByMenuId(menu_id: number) {
  return prisma.review.findMany({
    where: { menu_id },
  });
}

export function deleteReviewById(id: number) {
  return prisma.review.delete({
    where: { id },
  });
}


