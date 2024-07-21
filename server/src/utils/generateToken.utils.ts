import jwt from "jsonwebtoken";
import { IPayload } from "../interface/payload.interface";
import config from "../config";

export const generateAccessToken = (payload: IPayload) => {
  const accessToken = jwt.sign(payload, config.jwt.access_token_secret!, {
    expiresIn: config.jwt.access_token_expiry,
  });
  return accessToken;
};

export const generateRefreshToken = (payload: Pick<IPayload, "id">) => {
  const refreshToken = jwt.sign(payload, config.jwt.refresh_token_secret!, {
    expiresIn: config.jwt.refresh_token_expiry,
  });
  return refreshToken;
};
