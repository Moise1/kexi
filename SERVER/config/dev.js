import dotenv from "dotenv"; 

dotenv.config(); 
let config = {}; 
config.DATABASE_URL = process.env.DB_PATH; 
config.SECRET_OR_PRIVATE_KEY = process.env.SECRET_OR_PRIVATE_KEY; 
config.DB_PASSWORD = process.env.DB_PASSWORD;    

export default {
    DATABASE_URL: config.DATABASE_URL,
    SECRET_OR_PRIVATE_KEY: config.SECRET_OR_PRIVATE_KEY, 
    DB_PASSWORD: config.DB_PASSWORD
} 