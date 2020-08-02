import FolderModel from '../models/folderModel';
import { types } from "pg";
import tokenMan from '../helpers/tokenMan'

class FolderController {

    static async newFolder(req, res) {

        try {
            const user = tokenMan.getSiteCookies(req, res)['token'];
            const decodedUser = tokenMan.decodeToken(user);
            const {first_name, last_name, user_id} = decodedUser.user;
            const creator_name = `${first_name} ${last_name}`;
            let {rows} = await FolderModel.getAll();
            const currentFolderCount = rows;
            for(let i = 0; i <= currentFolderCount.length ; i++){
                const {rows} = await FolderModel.create('', user_id, creator_name);
                return res.render("client-files", {data: rows})
            }

        } catch (error) {
            return res.status(500).json({error: error.message})
        }   
    }

    static async allFolders(req, res) {
        try {

            const { rows } = await FolderModel.getAll();
            const timeStampOID = 1082;
            const realDate = rows[0]
            types.setTypeParser(timeStampOID, real_date => {
                return real_date
            })
            return res.render("client-files", { data: rows });
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }
}

export default FolderController