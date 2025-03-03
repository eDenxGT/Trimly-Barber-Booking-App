import dotenv  from 'dotenv';
dotenv.config()

export const config = {
   cors: {
      ALLOWED_ORIGIN: process.env.CORS_ALLOWED_ORIGIN || "http://localhost:5173"
   },

   server: {
      PORT: process.env.PORT || 5000,
      NODE_ENV: process.env.NODE_ENV || "development" 
   },

   database: {
      URI: process.env.DATABASE_URI || ""
   },

   loggerStatus: process.env.LOGGER_STATUS || "dev",

   bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10)
} 
