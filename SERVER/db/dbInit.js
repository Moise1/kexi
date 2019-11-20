import pool from "./dbConnect";

export default {
    query(queryText, params) {
      return new Promise((resolve, reject) => {
        try{
          const res = pool.query(queryText, params);
          resolve(res);
        }catch(err){
          reject(err);
        } 
      });
    },
  };  