const createError = require('http-errors');
const ExpensesModel = require('../models/ExpensesModel')

class ExpenseService{
    constructor(){

    }

    async getExpenseByCategory(payload){
        try{
            const {category_id,user_id} = payload;
            if(!category_id){
                throw createError.BadRequest("Category id cannot be null");
            }
            if(!user_id){
                throw createError.BadRequest("user id cannot be null");
            }
            
            const data = await ExpensesModel.findAll({
                where:{
                    category_id:category_id,
                    user_id:user_id
                }
            }).catch(err=>{
                console.log("Error while fetching expense data",err);
                throw createError.InternalServerError("Error while fetching expense data");
            });

            return data;
        }
        catch(err){
            throw err;
        }
    }
    async addExpense(payload){
        try{
            const {description,category_id,amount,user_id} = payload;

            if(!category_id){
                return createError.BadRequest("Category Id cannot be empty");
            }

            if(!amount){
                return createError.BadRequest("Amount cannot be empty");
            }

            if(!user_id){
                return createError.BadRequest("User Id cannot be empty");
            }

            const data = await ExpensesModel.create({
                description:description,
                category_id:category_id,
                amount:amount,
                user_id:user_id
            }).catch(err=>{
                console.log("Error during expense creation",err);
                throw createError.InternalServerError("Error during Expense Creation");
            })

            return data;
        }
        catch(err){
            throw err;
        }
    }


    async deleteExpense(payload){
        try{
            const {id,user_id} = payload;
            if(!id){
                throw createError.BadRequest("Expense id cannot be null");
            }

            await ExpensesModel.destroy({
                where:{
                    id:id,
                    user_id:user_id
                }
            }).catch(err=>{
                console.log("Error during expense deletion",err);
                throw createError.InternalServerError("Error during expense deletion");
            })
        }
        catch(err){
            throw err;
        }
    }
}

module.exports = ExpenseService;