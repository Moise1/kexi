import dotenv from 'dotenv';
import pool from "./index";

const removeTables =  "DROP TABLE IF EXISTS users, files CASCADE;";

dotenv.config()
pool.connect().then(client =>{
    client.query(removeTables).then(res =>{
        client.release()
        console.log('Connected...');
    }).catch(err =>{
        client.release()
        console.log(err.message);
    })
});

module.exports = pool;

