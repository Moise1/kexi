import db from "../db/dbInit";
import {hashingPassword, isSame} from "../helpers/password";
import uuid from "uuid/v1";



class UserModel {

    static async create(req){


        const {signup_first_name, signup_last_name, signup_email, signupcpassword } = req;

        const new_user = {
            user_id: uuid(),
            signup_first_name: signup_first_name, 
            signup_last_name: signup_last_name, 
            signup_email: signup_email.toLowerCase(), 
            signupcpassword: await hashingPassword(signupcpassword, 10)
        };


        const queryText = "INSERT INTO users(user_id, first_name, last_name, email, password) VALUES($1, $2, $3, $4, $5) RETURNING*";

        const values = [
            new_user.user_id,
            new_user.signup_first_name,
            new_user.signup_last_name,
            new_user.signup_email,
            new_user.signupcpassword
        ];
        const queryResult = await db.query(queryText, values); 
        return queryResult;
    }


    static async findMail(email){
        const queryText = "SELECT * FROM users WHERE email=$1";
        const mailData = await db.query(queryText, [email]);
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