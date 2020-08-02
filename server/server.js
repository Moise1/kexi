import express from "express";
import dotenv from 'dotenv';
import ejs from "ejs";
import path from "path";
import router from "./routes/routerIndex";
import formidable from "express-formidable";
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';


dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
app.use(formidable());
app.use(cookieParser())
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../views')));
app.use(methodOverride('_method'))

app.get('/archive', (req, res)=>{
    res.render('../views/archive', {data: ''}); 
})

app.get('/contact', (req, res)=>{
    res.render('../views/contact', {data: ''})
})

app.use("*", (req, res) => {
    return res.send("Method Not Allowed!");
})


// eslint-disable-next-line
const port = process.env.PORT || 3000;
app.listen(port);
console.log("App running on ", port)
export default app;
