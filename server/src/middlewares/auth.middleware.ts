import { Response, NextFunction } from "express";
import config from "../config";
import { verify } from "jsonwebtoken";
import { AuthRequest } from "../interface/auth.interface";
import { IPayload } from "../interface/payload.interface";
import { UnauthenticatedError } from "../error/Errors";

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthenticatedError("Token not found");
  }

  const token = authorization.split(" ");
  if (token.length !== 2 || token[0] !== "Bearer") {
    next(new UnauthenticatedError("Unauthenticated"));
    return;
  }

  try {
    const user = verify(token[1], config.jwt.access_token_secret!) as IPayload;
    req.user = user;
    next();
  } catch (error) {
    throw new UnauthenticatedError("Unauthenticated");
  }
}
