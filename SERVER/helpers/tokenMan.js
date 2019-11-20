import jwt from "jsonwebtoken";
import dotenv from "dotenv"; 

dotenv.config(); 
let config = {}; 
config.secretOrPrivateKey = process.env.SECRET_OR_PRIVATE_KEY;

export default {
  tokenizer(payload) {
    const token = jwt.sign(payload, config.secretOrPrivateKey, {
      expiresIn: 86400,
    });
    return token;
  },

};