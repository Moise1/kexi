import express from "express";
import { json, Router} from "express"; 
import User from "../controllers/userController";
import FileContainer from "../controllers/fileController"; 
import {tokenExists, userAccess} from "../middleware/userToken";



const router = express.Router(); 
router.use(json()); 

// User router 

router.post("/signup_auth", User.SignUp); 
router.post("/login_auth", User.SignIn);

// File router

router.post("/upload", FileContainer.fileCreator);
router.get("/documents", FileContainer.allFiles);
router.get("/documents/:file_name", FileContainer.singleFile);
router.get("/download", FileContainer.singleFile);
router.delete("/documents/:file_name", FileContainer.deleteFile);



export default router;