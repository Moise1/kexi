import express from "express";
import { json, Router} from "express"; 
import User from "../controllers/userController";
import FileContainer from "../controllers/fileController"; 
import {tokenExists, userAccess} from "../middleware/userToken";



const router = express.Router(); 
router.use(json()); 

// User router 

router.post("/signUpFiles", User.SignUp); 
router.post("/signInFiles", User.SignIn);
// File router

router.post("/upload", FileContainer.fileCreator);
router.get("/AllFiles", FileContainer.allFiles);
router.get("/AllFiles/:file_name", FileContainer.singleFile);
router.delete("/AllFiles/:file_name", FileContainer.deleteFile);



export default router;