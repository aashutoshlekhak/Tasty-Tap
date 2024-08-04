export interface IReview {
  id?: number;
  user_id: number;
  menu_id: number;
  review: string;
  rating: number;
  sentiment: review_sentiment
}

export enum review_sentiment {
  POSITIVE = "POSITIVE",
  NEGATIVE = "NEGATIVE",
  NEUTRAL = "NEUTRAL",
}

export type IReviewPayload = Pick<IReview, "user_id" | "review" | "menu_id">;
