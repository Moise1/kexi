import poolConnector from "../config/config";

poolConnector.on("connect", () => {
    console.log('Tables dropped...');
});

const removeTables = "DROP TABLE IF EXISTS users, files CASCADE;";
poolConnector.query(removeTables);

module.exports =  poolConnector;
