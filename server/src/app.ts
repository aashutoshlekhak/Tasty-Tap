import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import config from "./config";
import router from "./routes/index.router";
const app = express();
app.use(
  cors({
    origin: config.cors.origin,
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));
app.use(cookieParser());
app.use(router);
export default app;
