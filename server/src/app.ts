import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import config from "./config";
import router from "./routes/index.router";
import {
  genericErrorHandler,
  notFoundError,
} from "./middlewares/errorHandler.middleware";
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // cloudnary ma janu agadi public ko temp ma jancha. safe practice.
app.use(cookieParser());
app.use(router);
app.use(notFoundError);
app.use(genericErrorHandler);
export default app;
