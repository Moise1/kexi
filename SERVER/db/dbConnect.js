import poolConnector from "../config/config";

poolConnector.on("connect", () => {
    console.log('DB Connected...');
});


try{

    const  tables = `
            CREATE TABLE IF NOT EXISTS users(
             user_id VARCHAR(250) NOT NULL PRIMARY KEY, 
             first_name  VARCHAR(50) NOT NULL, 
             last_name  VARCHAR(50) NOT NULL, 
             email VARCHAR(250) UNIQUE NOT NULL, 
             password VARCHAR(250) NOT NULL);`;

poolConnector.query(tables);


}catch(err){
    console.log(err.message);
}
module.exports = poolConnector;