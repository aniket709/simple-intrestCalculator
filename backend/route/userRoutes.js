
const express = require ("express");

const { registerUser, loginUser,calculateSimpleIntrest, Hi } = require("../controller/userController");

const  verifyToken= require("../middleware/validate.js")

const router = express.Router();

router.post("/signup",registerUser);
 
router.post("/signin",loginUser);
router.post("/intrest",verifyToken,calculateSimpleIntrest)
router.get("/hi",verifyToken,Hi)



module.exports= router;