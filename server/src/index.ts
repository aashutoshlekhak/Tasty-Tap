import config from "./config";
import app from "./app";
import { connectDB } from "./db/prisma.db";
import loggerWithNameSpace from "./utils/logger.utils";

connectDB()
  .then(() => {
    app.on("error", (error) => {
      const logger = loggerWithNameSpace("Server Error");
      logger.error(error);
      throw error;
    });
    app.listen(config.port || 3000, () => {
      console.log(`Server started at port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Failed to connect database", error);
  });
