import jwt from "jsonwebtoken";
import dotenv from "dotenv"; 

dotenv.config(); 

export default {
  tokenizer(payload) {
    return jwt.sign(payload, process.env.SECRET_OR_PRIVATE_KEY, {
      expiresIn: 86400,
    });
  },
  decodeToken(payload){
    return jwt.verify(payload, process.env.SECRET_OR_PRIVATE_KEY);
  },

   getSiteCookies(req){
    // We extract the raw cookies from the request headers
    
    const rawCookies = req.headers.cookie.split('; ');
    // rawCookies = ['myapp=secretcookie, 'analytics_cookie=beacon;']
   
    const parsedCookies = {};
    rawCookies.forEach(rawCookie=>{
    const parsedCookie = rawCookie.split('=');

    // parsedCookie = ['myapp', 'secretcookie'], ['analytics_cookie', 'beacon']
     parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });
    return parsedCookies;
   }

};