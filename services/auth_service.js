const createError = require('http-errors')
const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt')

class AuthService{
    constructor(){

    }

    async registerUser(payload){
        try{
            const {email, password, phone_number, name} = payload;

            // Check if email exists
            const emailData = await UserModel.findOne({
                where: {
                    email: email
                }
            }).catch(err => {
                console.log("Error during checking user", err.message)
                throw createError.InternalServerError("Error during registration")
            })

            if (emailData) {
                throw createError.Conflict("User Email Already exists.")
            }

            // check if the phone exists
            const phoneData = await UserModel.findOne({
                where: {
                    phone_number: phone_number
                }
            }).catch(err => {
                console.log("Error during checking user", err.message)
                throw createError.InternalServerError("Error during registration")
            })

            if (phoneData) {
                throw createError.Conflict("Phone number already exists.")
            }
            
            // Generate password
            const randomkey = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, randomkey)

            // Insert User
            const userPayload = {
                email: email,
                password: hashedPassword,
                phone_number: phone_number,
                is_verified: 1,
                name: name
            }
            const newUser = await UserModel.create(userPayload).catch(err => {
                console.log("Error while adding table", err.message);
                throw createError.InternalServerError("Error during registration");
            });

            return newUser;
        }
        catch(err){
            console.log(err);
            throw err;
        }
    }

    async loginUser(){

    }

}

module.exports = AuthService;