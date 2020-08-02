import dotenv from "dotenv";
import devKeys from "./dev";
import prodKeys from "./prod";


dotenv.config();

if (process.env.NODE_ENV === "production") {
    module.exports = prodKeys;
  } else {
    module.exports = devKeys;
  }