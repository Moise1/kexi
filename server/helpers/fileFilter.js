export const  fileFilter = (req, file, cb) =>{

        if(!file.originalname.match(/\.(pdf|docx|xls)$/)){
            req.fileValidationError = 'Only PDF, MS Word and MS Excel files allowed.'
           return cb(new Error('Only PDF, MS Word and MS Excel files allowed.'), false);
        }; 
        cb(null, true);
}; 