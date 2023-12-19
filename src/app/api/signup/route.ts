import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/dbConnect/connect";
import CalUser from "@/models/calUsers";
import bcryptjs from "bcryptjs"
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { sendEmail } from "@/helper/mailer";



dbConnect()
export async function POST(req: NextRequest) {
    try {
        const data = await req.formData()
        const username = data.get("username") as string
        const email = data.get("email") as string
        const password = data.get("password") as string
    
        const user = await CalUser.findOne({email: email})

        if (user){
            throw new Error("User Already Exist Try login")
        }else{

            const salt = await bcryptjs.genSalt(10)
            const hashPassword = await bcryptjs.hash(password, salt)

    

    
            const newCalUser = new CalUser({
                _id: new mongoose.Types.ObjectId(),
                username: username,
                email: email,
                password: hashPassword
            })
            const saved = await newCalUser.save()
            await sendEmail({email, emailType: "VERIFY", userId: saved._id})
            
                const tokenData = {
                    id: newCalUser._id,
                    username: newCalUser.username,
                    email: newCalUser.email
                }
        
                const token =  jwt.sign(tokenData, process.env.TOKEN_SECRET as string, {expiresIn: "1d"})
        
                const res = NextResponse.json({message: "Login is successfull", success: true})
        
                res.cookies.set("token", token, {httpOnly: true})
        
                return res;
            }
        

    } catch (error: any) {
        if(error.message === "Operation `calusers.findOne()` buffering timed out after 10000ms") error.message = "Poor Network Connection"

        return NextResponse.json({error: error.message}, {status: 400})
    }
}