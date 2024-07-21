import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const config = {
  // PORT
  port: process.env.PORT,
  //   CLOUDINARY
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },

  //JWT
  jwt: {
    access_token_secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    access_token_expiry: process.env.JWT_ACCESS_TOKEN_EXPIRY,
    refresh_token_secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    refresh_token_expiry: process.env.JWT_REFRESH_TOKEN_EXPIRY,
  },
  //CORS
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
};

export default config;
