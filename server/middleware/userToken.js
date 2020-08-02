import jwt from "jsonwebtoken";
import dotenv from 'dotenv';


dotenv.config();

export const tokenExists = (req, res, next) => {
  const rawCookies = req.headers.cookie.split('; ');
  let parsedCookies = {};
  rawCookies.forEach(rawCookie=>{
    const parsedCookie = rawCookie.split('=');
     parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });
  if (parsedCookies.token === null || parsedCookies.token === undefined || req.headers.cookie === undefined) {
    return res.render( 'archive', {data: "Sorry! No token provided!"})
  }
  next();
};

export const userAccess = async(req, res, next) => {
  
  const rawCookies = req.headers.cookie.split('; ');
  let parsedCookies = {};
  rawCookies.forEach(rawCookie=>{
    const parsedCookie = rawCookie.split('=');
     parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });
  const token = parsedCookies.token;
  try {
    if (!token) {
      return res.render('archive', {data: "Access Denied."})
    }
    const decryptedToken = jwt.verify(token,process.env.SECRET_OR_PRIVATE_KEY);
    req.user = decryptedToken.email;
    next();
   
  } catch (err) {
    return res.send(err.message);
  }
};
