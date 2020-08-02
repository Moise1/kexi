import pool from "./index";

    const  createTables= `
    CREATE TABLE IF NOT EXISTS users(
     user_id VARCHAR(250) NOT NULL PRIMARY KEY, 
     first_name  VARCHAR(50) NOT NULL, 
     last_name  VARCHAR(50) NOT NULL, 
     email VARCHAR(250) UNIQUE NOT NULL, 
     password VARCHAR(250) NOT NULL);
     
     CREATE TABLE IF NOT EXISTS files( 
         file_id VARCHAR(250) NOT NULL PRIMARY KEY,
         file_name VARCHAR(250) NOT NULL,  
         file_type VARCHAR(250) NOT NULL, 
         file_size VARCHAR(250) NOT NULL,
         uploaded_at DATE NOT NULL, 
         updated_at DATE);`;

pool.connect().then(client =>{
    client.query(createTables).then(res =>{
        client.release()
        console.log('Connected...');
    }).catch(err =>{
        console.log(err.message);
    })
});

module.exports = pool;
