// import multer from "multer";
// import fs from "fs-extra";
// import path from "path";
// import {fileFilter} from "./fileFilter";
// import ResponseHandler from "../utils/ResponseHandler";


// // Uploading  files. 

// const storage = multer.diskStorage({

//     destination: async (req, file, cb) => {
//         let path = './SERVER/uploads/';
//         fs.mkdirsSync(path);
//         return cb(null, path);
//     },

//     filename: async (req, file, cb) => {
//         await cb(null, file.originalname);
//     }
// });



// class MasterFilter {

//     static filterFunc(req, res, next) {

//         const uploader = multer({
//             storage: storage,
//             fileFilter: fileFilter
//         }).array("files");

//         uploader(req, res, (err) => {

//             if (req.fileValidationError) {
//                 return res.send(req.fileValidationError);

//             } else if (!req.files){

//                 return res.send('Please choose a file  to upload');

//             } else if (err instanceof multer.MulterError) {
//                 return res.send(err);

//             } else if (err) {
//                 return res.send(err);
//             } else {

//                 req.files.filter(async f => {
//                     await FileModel.create(f.filename, f.mimetype, f.size); 
//                 }); 
//                return  res
//                     .status(201)
//                     .json(new ResponseHandler(201, "File(s) successfully uploaded.").result());
//             }

//         })
//     }
// }

// export default MasterFilter;