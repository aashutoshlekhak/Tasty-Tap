import * as ReviewService from "../services/review.service";
import HttpStatusCodes from "http-status-codes";
import { IReviewPayload } from "../interface/review.interface";
import { AuthRequest } from "../interface/auth.interface";
import { NextFunction, Response } from "express";

export async function createReview(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const reviewData = req.body;
    reviewData.user_id = req.user.id;
    console.log("reivew data from controller", reviewData);
    const respons = await ReviewService.createReview(reviewData);
    res.status(HttpStatusCodes.CREATED).json(respons
      
    );
  } catch (error) {
    next(error);
  }
}

export async function findReviewByMenuId(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const menu_id = req.body;
    const review = await ReviewService.findReviewByMenuId(menu_id);
    res.status(HttpStatusCodes.OK).json(review);
  } catch (error) {
    next(error);
  }
}

export async function deleteReviewById(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    await ReviewService.deleteReviewById(id);
    res.status(HttpStatusCodes.OK).json({ message: "Review deleted" });
  } catch (error) {
    next(error);
  }
}


