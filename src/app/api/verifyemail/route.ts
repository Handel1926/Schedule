import dbConnect from '@/dbConnect/connect';
import {NextRequest, NextResponse} from 'next/server'
import CalUser from "@/models/calUsers";


 dbConnect()


export async function POST(req: NextRequest){
    try {
        const reqBody = await req.formData()
        const token = reqBody.get("token")
        console.log(token)

        const user = await CalUser.findOne({
            verifyToken: token,
            verifyTokenExpiry: {$gt: Date.now()}
        })
        if (!user){
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }else{
            user.isVerified = true
            user.verifyemail = undefined
            user.verifyTokenExpiry = undefined
            user.verifyToken = undefined
            await user.save()
            return NextResponse.json({message: "Email verified", success: true})
        }

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
        
    }
}