import { NextFunction, Response } from "express";

import { AuthRequest } from "../interface/auth.interface";
import loggerWithNameSpace from "../utils/logger.utils";

const logger = loggerWithNameSpace("RequestLogger");

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  logger.info(`${req.method}: ${req.url}`);

  next();
}
