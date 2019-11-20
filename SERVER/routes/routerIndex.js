import express from "express";
import { json, Router} from "express"; 
import User from "../controllers/userController";
// import Entry from "../controllers/entryCtrl"; 
import {tokenExists, userAccess} from "../middleware/userToken"



const router = express.Router(); 
router.use(json()); 

// User router 

router.post("/auth/signup", User.SignUp); 
router.post("/auth/signin", User.SignIn);


// Entry router 
// router.post("/api/v1/entries", tokenExists, userAccess, Entry.addEntry); 
// router.get("/api/v1/entries", tokenExists, userAccess, Entry.allEntries);
// router.get("/api/v1/entries/:entry_id", tokenExists, userAccess, Entry.singleEntry);
// router.patch("/api/v1/entries/:entry_id", tokenExists, userAccess, Entry.updateEntry);
// router.delete("/api/v1/entries/:entry_id", tokenExists, userAccess,  Entry.deleteEntry)


export default router;