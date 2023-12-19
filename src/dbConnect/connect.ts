import mongoose from "mongoose";
import { NextResponse } from "next/server";


export default async function dbConnect() {
    try {
       const res = await mongoose.connect(process.env.MONGODB_URI as string)

    } catch (error: any) {
        console.log(error.message)
    }
}