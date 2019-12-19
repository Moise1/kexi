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

            // const path = req.params[0] ? req.params[0]: 'files.html';

            return res.redirect("/AllFiles");
            
            // return res.send(rows);

            // const token = tokenMan.tokenizer({
            //     user_id: rows[0].user_id
            // });
                      
                    
        }catch(error){
            return res 
            .status(500) 
            .send(new ResponseHandler(500, error.message, null, error).result())
        }

    }

    static async SignIn(req, res){

      
        try{
           
            const {email, password} = req.body;

            // Check if email exists.
            const {rows} = await UserModel.findMail(email);

                if (rows.length === 0) {
                    return res
                    .status(404) 
                    .send(new ResponseHandler(404, `User with email ${email} is not found!`, null).result());
                }

                const matcher = await isSame(password, rows[0].password);

                if (!matcher) {
                    return res
                    .status(401) 
                    .send(new ResponseHandler(401, "Invalid Password").result());
                }; 


                return res.redirect("/AllFiles");
                // const path = req.params[0] ? req.params[0]: 'files.html';

                // return res.sendFile(path, {root: "./UI"} );

                // Generating user token.


                // const token = await tokenMan.tokenizer({
                //     user_id: rows[0].user_id
                // });

                // const returnedResponse = {
                //     token: token, 
                //     ...lodash.omit(rows[0], ['password'])
                // }

                // .header('Authorization', `Bearer ${token}`)
                // .status(200)
                // .send(new ResponseHandler(200, "Successfully Signed In.", rows[0]).result())


        }catch(error){
            return res
            .status(500)
            .send(new ResponseHandler(500, error.message, null, error).result())
        }
        
    }

} 


export default User;