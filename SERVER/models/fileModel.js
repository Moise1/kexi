import db from "../db/dbInit";
import moment from "moment";
import uuid from "uuid/v1";

class FileModel{


    static async create(file_name, file_type, file_size){

        let time = moment(); 
        const uploaded_at = time.format('DD-MM-YYYY');

        const new_file =  {
            file_id: uuid(),
            file_name: file_name, 
            file_type: file_type, 
            file_size: file_size,
            uploaded_at
        }
       

        const queryText = "INSERT INTO files (file_id, file_name, file_type, file_size, uploaded_at) VALUES($1, $2, $3, $4, $5) RETURNING *"; 

        const values = [ 
            new_file.file_id,
            new_file.file_name,  
            new_file.file_type, 
            new_file.file_size,
            new_file.uploaded_at
        ]

        const queryResult = await db.query(queryText, values); 
        return queryResult;

    }

    static async getAll(){

        const queryText = "SELECT * FROM files"; 
        const queryResult = await db.query(queryText);
        return queryResult;

    }

    static async getOne(file_name){
        const queryText = "SELECT files.file_name FROM files WHERE file_name=$1";
        const queryResult = await db.query(queryText, [file_name]);
        return queryResult;
    }

    static async RemoveFile(file_name){
        const {rows} = await this.getOne(file_name); 
        const queryText = "DELETE  FROM files WHERE file_name=$1"; 
        const queryResult = await db.query(queryText, [rows[0].file_name]);
        return queryResult;
    }

}

export default FileModel; 