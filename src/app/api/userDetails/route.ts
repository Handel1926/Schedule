import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextResponse, NextRequest } from "next/server";
import CalUser from "@/models/calUsers";
import dbConnect from "@/dbConnect/connect";
import Todo from "@/models/todo";
import Note from "@/models/notes";
import Reminder from "@/models/reminder";
import  nodemailer from 'nodemailer'
import { ReminderType, mailOptions } from "../../../../type";


dbConnect();

const sendNotification = async ()=>{
    const tDate = new Date()
    const notify = tDate.getTime()
    
    const userReminders = await Reminder.find()
    let todayReminder: ReminderType[] = []


    if (!userReminders){
        return;
    }else {
        
        userReminders.forEach(async(reminder)=>{
            if (!reminder.sent && reminder.notify > (notify - 320000) && reminder.notify < (notify + 320000)){
                todayReminder.push(reminder)
                reminder.sent = true
                await reminder.save()
            }
        })
    }
    
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.MAILER_USERID as string,
          pass: process.env.MAILER_PASSID as string
        }
      });
      var optionsList: mailOptions[] = []
    todayReminder.forEach(rem=>{
        
            var mailOptions = {
                from: "ebi1926a@gmail.com",
                to: rem.email,
                subject: "Reminder",
                html: `<p>${rem.reminder}</p>`
            }
            optionsList.push(mailOptions)
        
        
    })
    optionsList.forEach(async (option)=>{
        await transport.sendMail(option)
    })
    

    
    
    
    setTimeout(()=>sendNotification(), 60000)
}
sendNotification()


export async function GET(req: NextRequest){
    try {
        const userId: string = await getDataFromToken(req)
        const user = await CalUser.findOne({_id: userId}).select("-password")
        const userTodo = await Todo.find({userId: userId})
        const userReminder = await Reminder.find({userId: userId})
        const userNote = await Note.find({userId: userId}) 
        return NextResponse.json({message: "user found", data: user, todo: userTodo, reminder: userReminder, note:userNote})
    } catch (error: any) {
        return NextResponse.json({error: error.message})
    }
}

export async function POST(req: NextRequest) {
    const userId = await getDataFromToken(req)
    const user = await CalUser.findById(userId)
    const data = await req.formData()
    const opt = data.get("tdr") as string

    if (opt === "todo"){
        const newtodo = data.get("newTask")
        if (!newtodo) return NextResponse.json({error: "No writing todo"}, {status:400})
        const newtodoObj = new Todo({
            userId: userId,
            todo: newtodo
        })
        await newtodoObj.save()
        return NextResponse.json({message: "Added"})
    }
    if (opt === "reminder"){
        const newReminder = data.get("newTask")
        if (!newReminder) return NextResponse.json({error: "No writing reminder"}, {status:400})
        const time = data.get("time")
        if (!time) NextResponse.json({error: "Time not set"})
        const date = data.get("date")
        if (!date) NextResponse.json({error: "Date not set"})
        
        const newdate = new Date(`${date} ${time}`)
        
        const notify = newdate.getTime()
        
        const newtodoObj = new Reminder({
            userId: userId,
            email: user.email,
            reminder: newReminder,
            date: date,
            time: time,
            notify: notify
        })
        await newtodoObj.save()
        return NextResponse.json({message: "Added"})
    }
    if (opt === "note"){
        const noteTitle = data.get("noteTitle")
        const note = data.get("note")
        if (!noteTitle) return NextResponse.json({error: "No writing todo"}, {status:400})
        const newtodoObj = new Note({
            userId: userId,
            title: noteTitle,
            note: note!,
            date: `${new Date().getDate() < 10 ? "0" + new Date().getDate().toString(): new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
            time: `${new Date().getHours() < 10 ? "0" + new Date().getHours().toString(): new Date().getHours()}:${new Date().getMinutes() < 10 ? "0" + new Date().getMinutes().toString(): new Date().getMinutes()}`,
            display: false
        })
        await newtodoObj.save()
        return NextResponse.json({message: "Added"})
    }
}

export async function PUT(req: NextRequest) {
    const formData = await req.formData()
    const noteId = formData.get("id")
    const noteTitle = formData.get("noteTitle")
    const note = formData.get("note")
    await Note.findByIdAndUpdate(noteId, {title: noteTitle, note: note})
    return NextResponse.json({message: "Updated"}, {status: 200})
}

export async function DELETE(req: NextRequest) {
    const formData = await req.formData()
    const tdr = formData.get("tdr")
    
    const Id = formData.get("id")
    if (tdr === "note"){
        await Note.findByIdAndDelete(Id)
    }else if (tdr === "reminder"){
        await Reminder.findByIdAndDelete(Id)
    }else if (tdr === "todo"){
        await Todo.findByIdAndDelete(Id)
    }
    
    return NextResponse.json({message: "Deleted"}, {status: 200})
}