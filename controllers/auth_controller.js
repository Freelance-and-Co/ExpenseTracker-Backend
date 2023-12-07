const express = require('express');

const router = express.Router();
const AuthService = require('../services/auth_service')

router.post("/register", async(req,res,next)=>{
    try{
        const authObj = new AuthService();
        const payload = req.body;
        const data = await authObj.registerUser(payload);
        res.send({
            "message":"User Registration Done",
            "status":200,
            "data":data
        })
    }
    catch(err){
        console.log(err);
        next(err);
    }
})

router.post('/login', async(req,res,next)=>{
    try{

    }
    catch(err){
        next(err);
    }
})
module.exports = router;