import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/dbConnect/connect";
import CalUser from "@/models/calUsers";
import bcryptjs from "bcryptjs"
import mongoose from "mongoose";
import jwt from "jsonwebtoken"





export async function POST(req: NextRequest) {
    try{
        dbConnect()
    const data = await req.formData()
    const email = data.get("email")
    const password = data.get("password") as string

    const user = await CalUser.findOne({email})
    
    const validatePassword = await bcryptjs.compare(password, user.password)
    if (!user){
        throw new Error("Wrong Email address")
    }else if (!validatePassword) {
        throw new Error("Wrong password")
    } else {
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
    
        const token =  jwt.sign(tokenData, process.env.TOKEN_SECRET as string, {expiresIn: "1d"})
        console.log(token)
    
        const res = NextResponse.json({message: "Login is successfull", success: true})
    
        res.cookies.set("token", token, {httpOnly: true})
    
        return res;
    }
    
} catch (error: any) {
    if(error.message === "Operation `calusers.findOne()` buffering timed out after 10000ms") error.message = "Poor Network Connection"
   return NextResponse.json({error: error.message}, {status: 400})

}

}