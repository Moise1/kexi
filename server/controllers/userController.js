import UserModel from "../models/userModel"; 
import {isSame} from "../helpers/password";
import lodash from "lodash";  
import ResponseHandler from "../utils/ResponseHandler"; 
import tokenMan from "../helpers/tokenMan"; 


class User {

    static async SignUp(req, res){
        try{
            const oneMail = await UserModel.findMail(req.body.signup_email);

            if(oneMail.rows.length !== 0){
                return res
                .status(409)
                .json(new ResponseHandler(409, 'Sorry! Email already taken.').result());
            }
        
            const {rows} = await UserModel.create(req.body);
            if(rows){
                return res.redirect("/documents");
            }         
        }catch(error){
            return res 
            .status(500) 
            .send(new ResponseHandler(500, error.message, null, error).result())
        }

    }

    static async SignIn(req, res){

        try{
            const {email, password} = req.body;
            console.log(email);
            // Check if email exists.
            const {rows} = await UserModel.findMail(email);
            const matcher = await isSame(password, rows[0].password);

                if (rows.length === 0) {
                    return res
                    .status(404) 
                    .send(new ResponseHandler(404, `User with email ${email} is not found!`, null).result());
                }
                if (!matcher) {
                    return res
                    .status(401) 
                    .send(new ResponseHandler(401, "Invalid Password").result());
                };
                if(rows){
                    return res.redirect("/documents");
                }

        }catch(error){
            console.log(error);
            return res
            .status(500)
            .send(new ResponseHandler(500, error.message, null, error).result())
        }
        
    }

} 


export default User;