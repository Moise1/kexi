import express from "express";
import { json, Router} from "express"; 
import User from "../controllers/userController";
import FileController from "../controllers/fileController"; 
import FolderController from "../controllers/folderController";
import { tokenExists ,userAccess} from "../middleware/userToken";



const router = express.Router(); 
router.use(json()); 

// User routes

router.post("/signup_auth", User.SignUp); 
router.post("/login_auth", User.SignIn);
router.post("/contact", User.SendMail)
router.post("/logout", User.Logout);

// Folder routes

router.post('/client-files', FolderController.newFolder);
router.get('/client-files',  FolderController.allFolders);

// File routes

router.get("/documents", tokenExists, userAccess,FileController.allFiles);
router.post("/upload", tokenExists, userAccess,FileController.fileCreator);
router.get("/documents/search", tokenExists, userAccess, FileController.searchFile)
router.get("/documents/:file_name", userAccess, FileController.singleFile);
router.post("/documents/:file_id", tokenExists, userAccess, FileController.deleteFile);

export default router;