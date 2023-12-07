const express = require('express');

const router = express.Router();
const ExpenseService = require('../services/expense_service');
const AuthService = require('../services/auth_service');


router.post("/getExpenses", new AuthService().verifyAccessToken, async (req,res,next)=>{
    try{
        const expenseServiceObj = new ExpenseService();
        const data = await expenseServiceObj.getExpenseByCategory(req.body);

        res.send({
            "status":"200",
            "message":"Data fetched successfully",
            "data":data
        })
    }
    catch(err){
        next(err);
    }
})
router.post("/addExpense", new AuthService().verifyAccessToken, async (req,res,next)=>{
    try{
        const expenseServiceObj = new ExpenseService();
        const data = await expenseServiceObj.addExpense(req.body);

        res.send({
            "message":"Expense added successfully",
            "status":200,
            "data":data
        })
        
    }
    catch(err){
        next(err);
    }
});


router.post("/deleteExpense", new AuthService().verifyAccessToken, async(req,res,next)=>{
    try{
        const expenseServiceObj = new ExpenseService();

        await expenseServiceObj.deleteExpense(req.body);
        res.send({
            "message":"Expense deleted successfully",
            "status":200
        })
    }
    catch(err){
        next(err);
    }
})

module.exports = router;