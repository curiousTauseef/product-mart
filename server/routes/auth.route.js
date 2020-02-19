const userController=require('../controller/user.controller.js')
const express=require('express');
const asynHandler=require('express-async-handler');

const router=express.Router();
//localhost:4050/api/auth/register
router.post('/register',asynHandler(insert));
router.post('/login',asynHandler(getUserByEmailAndPassword));

async function insert(req,res,next){
    const user=req.body;
    console.log(`reistering user`,user);
    const saveduser= await userController.insert(user);
    res.json(saveduser);
}

async function getUserByEmailAndPassword(req,res,next){
    const user=req.body;
    console.log(`searching user for`,user);
    const saveduser=await userController.getUserByEmailAndPassword(user.email,user.password);
    res.json(saveduser);
}

module.exports=router;
