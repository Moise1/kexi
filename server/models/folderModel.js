import db from "../db/dbInit";
import moment from "moment";
import uuid from "uuid/v1"; 

class FolderModel{

    static async create(folder_name, creator_id, creator_name){
        let time = moment(); 
        const created_at = time.format('DD-MM-YYYY');

        const new_folder =  {
            folder_id: uuid(),
            folder_name,
            creator_id,
            creator_name,
            created_at
        }

        const queryText = "INSERT INTO folders (folder_id, folder_name, creator_id, creator_name, created_at) VALUES($1, $2, $3, $4, $5) RETURNING *"; 

        const values = [ 
            new_folder.folder_id,
            new_folder.folder_name,  
            new_folder.creator_id,
            new_folder.creator_name,
            new_folder.created_at
        ]

        const queryResult = await db.query(queryText, values); 
        return queryResult;
    }

    static async getAll(){
        const queryText = "SELECT * FROM folders"; 
        const queryResult = await db.query(queryText);
        return queryResult;
    }
}


export default FolderModel