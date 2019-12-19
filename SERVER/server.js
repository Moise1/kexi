import express from "express";
import multer from "multer";
import moment from "moment";
import ejs from "ejs";
import path from "path";
import router from "./routes/routerIndex";
import ResponseHandler from "../SERVER/utils/ResponseHandler";
import formidable from "express-formidable";
import FileModel from "./models/fileModel";


const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(router);
app.use(formidable());
app.set('views', path.join(__dirname, '../UI')); 
app.set('view engine', 'ejs');
app.use(express.static('./UI'));

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

export default app;
