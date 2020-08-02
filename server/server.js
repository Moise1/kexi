import express from "express";
import multer from "multer";
import moment from "moment";
import ejs from "ejs";
import path, { dirname } from "path";
import router from "./routes/routerIndex";
import ResponseHandler from "./utils/ResponseHandler";
import formidable from "express-formidable";
import FileModel from "./models/fileModel";
import expressLayout from 'express-ejs-layouts';


const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(router);
app.use(formidable());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views/')); 

const middlewares = [
    expressLayout,
    express.static(path.join(__dirname, '../views/'))
]
app.use(middlewares);

app.get("/", (req, res) => {
    return res
    .status(200)
    .json(new ResponseHandler(200, "Welcome to KEXI!", null).result())
})

app.use("*", (req, res) => {
    return res
    .status(405)
    .json(new ResponseHandler(405, "Method Not Allowed!", null).result());
})



// eslint-disable-next-line
const port = process.env.PORT || 3000;
app.listen(port);
console.log("App running on ", port)
export default app;
