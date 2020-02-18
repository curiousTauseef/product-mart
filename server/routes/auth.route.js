const userController=require('../controller/user.controller.js')
const express=require('express');
const asynHandler=require('express-async-handler');

const router=express.Router();
//localhost:4050/api/auth/register
router.post('/register',asynHandler(insert));

async function insert(req,res,next){
    const user=req.body;
    console.log(`reistering user`,user);
    const saveduser= await userController.insert(user);
    res.json(saveduser);
}

module.exports=router;