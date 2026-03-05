import UserModel from "../models/user.model.js"
import bcryptjs from "bcryptjs" 
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js"

export async function registerUserController(req,res){
    try{
        const { name, email, password } = req.body

        if(!name || !email || !password){
            return res.status(400).json({
                message : "All fields are required",
                error : true,
                success : false
            })
        }

        const user = await UserModel.findOne({ email})

        // checking if email was already registered
        if(user){
            return res.json ({
                message : "User already exists",
                error : true,
                success : false
            })
        }

        //encrypting password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)

        const payload = {
            name,
            email,
            password : hashedPassword   
        }

        const newUser = new UserModel(payload)
        const save = await newUser.save()

        const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save}`

        const verifyEmail = await sendEmail({
            sendTo : email,
            subject : "Verify email from Blinkeyit",
            html :verifyEmailTemplate
        })
    }
    catch(error){
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}