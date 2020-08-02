import db from "../db/dbInit";
import moment from "moment";
import uuid from "uuid/v1";

class FileModel{


    static async create(file_name, file_type, file_size){

        const new_file =  {
            file_id: uuid(),
            file_name: file_name, 
            file_type: file_type, 
            file_size: file_size,
        }
       

        const queryText = "INSERT INTO files (file_id, file_name, file_type, file_size) VALUES($1, $2, $3, $4) RETURNING *"; 

        const values = [ 
            new_file.file_id,
            new_file.file_name,  
            new_file.file_type, 
            new_file.file_size,
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
        const queryText = "SELECT * FROM files WHERE file_name LIKE $1";
        const queryResult = await db.query(queryText, [file_name]);
        return queryResult;
    }

    static async searchFile(file_name){
        const queryText = `SELECT * FROM files WHERE  file_name ILIKE '%${file_name}%'`;
        const queryResult = await db.query(queryText);
        return queryResult;
    }

    static async specificFile( file_id){
        const queryText = "SELECT * FROM files  WHERE  file_id=$1"; 
        const queryResult = await db.query(queryText, [file_id]);
        return queryResult;
    } 

    static async RemoveFile(file_id){
        const {rows} = await this.specificFile(file_id); 
        const queryText = "DELETE  FROM files WHERE file_id=$1"; 
        const queryResult = await db.query(queryText, [rows[0].file_id]);
        return queryResult;
    }

}

export default FileModel; 