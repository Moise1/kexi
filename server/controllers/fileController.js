import multer from "multer";
import fs, { readSync } from "fs-extra";
import { types } from "pg";
import { fileFilter } from "../helpers/fileFilter";
import FileModel from "../models/fileModel";


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



class FileController {

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

            } else if (!req.files) {

                // Checking if no files are uploaded 
                return res
                    .status(400)
                    .send('Please choose a file  to upload');

            } else if (err instanceof multer.MulterError) {

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
                    await FileModel.create(f.filename, f.mimetype, f.size)
                });

                return res.redirect('/documents');

            }

        })
    }

    static async allFiles(req, res) {

        try {
            const { rows } = await FileModel.getAll();
            const timeStampOID = 1082;
            const realDate = rows[0]
            types.setTypeParser(timeStampOID, real_date =>{
                return real_date 
            })
            return res.json({rows});
            // return res.render("documents", { data: rows, documents: 'documents' });
        } catch (error) {
            return res
                .status(500)
                .json(error)
        }
    }


    static async singleFile(req, res) {

        try {
            const { file_name } = req.params;
            const { rows } = await FileModel.getOne(file_name);
            return res.send(rows[0]);
        } catch (error) {
            return res.send(error.message)
        }

    }

    static async searchFile(req, res){
        try{
            const file_name = req.query.q;
            const {rows} = await FileModel.searchFile(file_name);
            if(rows.length === 0){
                return res.json({message: 'No results found.'})
            }else {
                return res.json({rows});
                // return res.render('documents', {data: rows})
            }
        }catch(err){
            return res.send(err.message)
        }
    }

    static async deleteFile(req, res) {
        try {
            const { file_id } = req.params;
            await FileModel.RemoveFile(file_id);

            if(!file_id){
                return res.json({message: `File ${file_id} not found.`})
            }else {
                 return res.redirect('/documents');
            }
        } catch (err) {
            return res.json({message: err.message});
        }
    }
}

export default FileController;