const express = require('express');

const router = express.Router();
const CategoryService = require('../services/category_service');
const AuthService = require('../services/auth_service');


router.get("/getAllCategories/:user_id", new AuthService().verifyAccessToken, async (req,res,next)=>{
    try{
        const categoryServiceObj = new CategoryService();

        const data = await categoryServiceObj.getAllCategories(req.params.user_id);
        res.send({
            "message":"Data fetched successfully",
            "status":200,
            "data":data
        })
    }
    catch(err){
        next(err);
    }
})
router.post("/addCategory", new AuthService().verifyAccessToken, async (req,res,next)=>{
    try{
        const categoryServiceObj = new CategoryService();
        const data = await categoryServiceObj.addCategory(req.body);

        res.send({
            "message":"Category added successfully",
            "status":200,
            "data":data
        })
    }
    catch(err){
        next(err);
    }
});

router.post("/deleteCategory", new AuthService().verifyAccessToken, async (req,res,next)=>{
    try{
        const categoryServiceObj = new CategoryService();

        await categoryServiceObj.deleteCategory(req.body);
        res.send({
            "message":"Category deleted successfully",
            "status":200
        })
    }
    catch(err){
        next(err);
    }
})

module.exports = router;