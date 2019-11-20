import jwt from "jsonwebtoken";
import devKeys from "../config/dev";
import ResponseHandler from "../utils/ResponseHandler";


const tokenExists = (req, res, next) => {
  if (req.headers.authorization === " " || req.headers.authorization === undefined) {
    return res
      .status(400)
      .json(new ResponseHandler(400, "Sorry! No token provided!", null).result());
  }
  next();
};

const userAccess = async(req, res, next) => {

  const token = req.headers.authorization.split(" ")[1];

  try {
    if (!token) {
      return res
        .status(401)
        .json(new ResponseHandler(401, "Access Denied.").result());
    }
    
    const decryptedToken = jwt.verify(token, devKeys.SECRET_OR_PRIVATE_KEY);
    req.user = decryptedToken;
    next();
   
  } catch (err) {
    return res
      .status(500)
      .json(new ResponseHandler(500, err.message, null, err).result());
  }
};

export {
  tokenExists,
  userAccess
};