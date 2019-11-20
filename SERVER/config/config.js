import {Pool} from 'pg';
import dotenv from "dotenv";
import devKeys from "./dev";
import prodKeys from "./prod"; 

dotenv.config(); 


if (process.env.NODE_ENV === "production") {
  module.exports = prodKeys;
  } else {
    const poolConnector = new Pool({connectionString: devKeys.DATABASE_URL});
    module.exports = poolConnector;
    module.exports.devKeys = devKeys;
  }
  

  