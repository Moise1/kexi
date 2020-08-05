import multer from "multer";
import fs from "fs-extra";
import path from "path";
import {types} from "pg";
import autocompleter from "autocompleter";
import {fileFilter} from "../helpers/fileFilter";
import FileModel from "../models/fileModel";
import ResponseHandler from "../utils/ResponseHandler";
import dbInit from "../db/dbInit";


// Creating  files storage. 

const storage = multer.diskStorage({

    destination: async (req, file, cb) => {
        let path = './server/uploads';
        fs.mkdirsSync(path);
        return cb(null, path);
    },

    filename: (req, file, cb) => {
       return cb(null, file.originalname);
    }
});



class FileContainer {

    static async fileCreator(req, res, next) {

        const uploader = multer({
            storage: storage,
            fileFilter: fileFilter
        }).array("files");

        uploader(req, res, (err) => {

            // Validating the file' extensions. 

            if (req.fileValidationError) {
                return res
                .status(400)
                .send(req.fileValidationError);

            } else if (!req.files){

                // Checking if no files are uploaded 
                return res
                .status(400)
                .send('Please choose a file  to upload');

            } else if (err instanceof multer.MulterError){

                // Catching any server error that may occur 
                return res
                .status(500)
                .json(err);

            } else if (err) {
    
                // Catching any other possible error.
                return res
                .status(400)
                .send(err);

            } else {
                
                // On successful upload.
             req.files.filter(async f => {
                    console.log(f);
                    await FileModel.create(f.filename, f.mimetype, f.size)
                }); 

            }

        })
    }

    static async allFiles(req, res){

       try{
        const {rows} = await FileModel.getAll(); 

        const timeStampOID = 1082; 
        const real_date = rows[0]; 
        types.setTypeParser(timeStampOID, real_date => {
            return real_date;
        })
        return res.render("documents", {data: rows});
       }catch(error){
        console.log("ERROR", error)
        return res
        .status(500)
        .json(error)
       }
    }


    static async singleFile(req, res){
        
        const {file_name} = req.params; 
        const {rows} = await FileModel.getOne(file_name);
        return res.send(rows[0]);

    }

    static async deleteFile(req, res){

        const {file_name} = req.params; 
        const {rows} = await FileModel.getOne(file_name); 

        if(rows.length === 0){
            return res 
            .status(404)
            .json(new ResponseHandler(404, "File not found.").result());
        }else {

            await FileModel.RemoveFile(file_name);
            return res 
            .status(200)
            .json(new ResponseHandler(200, "File successfully deleted.").result());
        }
    }
}

export default FileContainer;