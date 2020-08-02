import NodeMailer from 'nodemailer';
import xoauth2 from 'xoauth2';
import { google } from 'googleapis'
import smtp from 'nodemailer-smtp-transport';
import dotenv from 'dotenv';
import UserModel from "../models/userModel";
import { isSame } from "../helpers/password";
import tokenMan from '../helpers/tokenMan';
import lodash from 'lodash';


dotenv.config();


class User {

    static async SignUp(req, res) {
        try {
            const oneMail = await UserModel.findMail(req.body.signup_email);

            if (oneMail.rows.length !== 0) {
                const emailTaken = "Sorry! Email already taken.";
                return res.render('archive', { data: emailTaken })
            }

            const { rows } = await UserModel.create(req.body);

            if (rows) {
                const token = tokenMan.tokenizer({
                    user: rows[0]
                })
                return res
                    .header('Access-Control-Allow-Credentials', true)
                    .cookie('token', token, {
                        maxAge: 24 * 60 * 60 * 1000,
                        secure: false,
                        httpOnly: true,
                        path: '/'
                    })
                    .redirect('/client-files');
            }
        } catch (error) {
            return res.send(error.message);
        }

    }

    static async SignIn(req, res) {

        try {
            const { email, password } = req.body;
            // Check if email doesn't exists.

            const { rows } = await UserModel.findMail(email);

            if (rows.length === 0) {
                const emailNotFound = `User with email ${email} is not found!`
                return res.render('archive', { data: emailNotFound })
            }

            const matcher = await isSame(password, rows[0].password);
            if (!matcher) {
                const invalidPassword = "Invalid Password."
                return res.render('archive', { data: invalidPassword });

            }
            const token = tokenMan.tokenizer({
                user: lodash.omit(rows[0], ['password'])
            })
           
            return res
                .header('Access-Control-Allow-Credentials', true)
                .cookie('token', token, {
                    maxAge: 24 * 60 * 60 * 1000,
                    secure: false,
                    httpOnly: true,
                    path: '/'
                })
                .redirect("/client-files");

        } catch (error) {
            return res.send(error.message);
        }
    }

    static async Logout(req, res) {
        try {
            res.clearCookie('token');
            return res.redirect('/')
        } catch (error) {
            return res.send(error.message);
        }
    }

    static async SendMail(req, res) {

        const OAuth2 = google.auth.OAuth2;
        const oauth2Client = new OAuth2({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            redirectUri: 'https://developers.google.com/oauthplayground'
        })

        oauth2Client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN
        });

        const accessToken = oauth2Client.getAccessToken()
        try {
            const { fullname, email, subject, message } = req.body;
            let transporter = NodeMailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: 'kexiconsult@gmail.com',
                    pass: process.env.MY_PASS,
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    refreshToken: process.env.REFRESH_TOKEN,
                    accessToken
                },
                tls: {
                    rejectUnauthorized: false
                }
            })

            const emailOptions = {
                from: email,
                to: 'kexiconsult@gmail.com',
                subject: subject,
                text: message
            }

            transporter.sendMail(emailOptions, (error, info) => {
                if (error) {
                    console.log('Error', error.message);
                } else {
                    transporter.close();
                    return res.render('contact', { data: `${fullname}, thank you for your message. We'll get back to you soon.` });
                }
            })
        } catch (err) {
            return res.send(err.message)
        }
    }
}


export default User;