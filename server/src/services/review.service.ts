import { NotFoundError } from "../error/Errors";
import {
  IReviewPayload,
  review_sentiment,
} from "../interface/review.interface";
import * as ReviewModel from "../models/review.model";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { initializeGemini } from "../utils/gemini.utils";
import { StructuredOutputParser } from "@langchain/core/output_parsers";

export async function createReview(reviewData: IReviewPayload) {
  try {
    // payload

    const llm = initializeGemini();
    const SENTIMENT_ANALYSIS_TEMPLETE = `You are a AI model expert in analyzing user reviews. You are given a review and you need to return a sentiment along with rating ranging from 1 to 5. The review is {review} and return in below formate: \n
        format_instruction: {format_instruction}
    `;

    const parser = StructuredOutputParser.fromNamesAndDescriptions({
      sentiment:
        "it is the sentiment of the review and the value should be either POSITIVE, NEGATIVE, NEUTRAL",
      rating: "it should be number ranging from 1 to 5 based on user review",
    });

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", SENTIMENT_ANALYSIS_TEMPLETE],
      ["human", "review: {review}"],
    ]);

    const promtTemplete = prompt.pipe(llm).pipe(parser);

    const res = await promtTemplete.invoke({
      format_instruction: parser.getFormatInstructions(),
      review: reviewData.review,
    });
    const review = {
      ...reviewData,
      sentiment: res.sentiment as review_sentiment,
      rating: parseInt(res.rating),
    };

    const createdReview = await ReviewModel.createReview(review);
    return res;
  } catch (error) {
    throw new Error(`Error while creating review: ${error}`);
  }
}

export async function findReviewByMenuId(menu_id: number) {
  try {
    const review = await ReviewModel.findReviewByMenuId(menu_id);
    if (!review) {
      throw new NotFoundError(`Review with menu id ${menu_id} not found`);
    }
    return review;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    } else {
      throw new Error(`Error while finding review: ${error}`);
    }
  }
}

export async function deleteReviewById(id: number) {
  try {
    await ReviewModel.deleteReviewById(id);
  } catch (error) {
    throw new Error(`Error while deleting review: ${error}`);
  }
}
