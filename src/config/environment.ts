import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || "3001", 10),
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
  instagramApiBaseUrl:
    process.env.INSTAGRAM_API_BASE_URL || "api.instagram.com/oauth",
  instagramAccessToken: process.env.INSTAGRAM_ACCESS_TOKEN || "",
};
