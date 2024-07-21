import { PrismaClient } from "@prisma/client";
import loggerWithNameSpace from "../utils/logger.utils";

const prisma = new PrismaClient();
export async function connectDB() {
  try {
    await prisma.$connect();
    // loggerWithNameSpace("DB connected successfully");
    console.log("DB connected successfully");
  } catch (error) {
    const logger = loggerWithNameSpace("DB connection failed");
    logger.error("failed to connect database");
    console.log("failed to conect database");
    process.exit(1);
  }
}

export default prisma;
