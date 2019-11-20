import db from "../db/dbInit";
import {hashingPassword, isSame} from "../helpers/password";
import uuid from "uuid/v1";



class UserModel {

    static async create(req){

        const  { first_name, last_name, email, password} = req;

        const encrypted_password = await hashingPassword(password, 10);

        const new_user = {
            user_id: uuid(),
            first_name, 
            last_name, 
            email: email.toLowerCase(), 
            encrypted_password
        };


        const queryText = "INSERT INTO users(user_id, first_name, last_name, email, password) VALUES($1, $2, $3, $4, $5) RETURNING*";

        const values = [
            new_user.user_id,
            new_user.first_name,
            new_user.last_name,
            new_user.email,
            encrypted_password
        ];
        const queryResult = await db.query(queryText, values); 
        return queryResult;
    }


    static async findMail(email){
        const queryText = "SELECT * FROM users WHERE email=$1";
        const mailResult = email.toLowerCase();
        const mailData = await db.query(queryText, [mailResult]);
        return mailData;
    }

    static async findUser(user_id){
        const queryText = "SELECT * FROM users WHERE user_id=$1";
        const queryResult = await db.query(queryText, [user_id]);
        return queryResult; 
    } 

    static async returningUser(){
        const queryText = "SELECT * FROM users WHERE user_id=$1";
        const queryResult = await db.query(queryText);
        return queryResult; 
    }

}


export default UserModel; 