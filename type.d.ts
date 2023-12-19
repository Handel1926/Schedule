import { type } from "os"

type Month = {
    month: string,
    days: number[],
    leapDays: number[],
}

type MonthDays = {
    month: string,
    sunday: number[] ,
    monday: number[] ,
    tuesday: number[] ,
    wednesday: number[] ,
    thursday: number[] ,
    friday: number[] ,
    saturday: number[] 
}

type daysArray = number[]

type NoteType = {
    _id: string,
    userId: string,
    title: string,
    note: string,
    date: string,
    time: string,
    display: boolean
}

type ReminderType = {
    _id: string,
    userId: string,
    email:string,
    reminder: string,
    date: string,
    time: string
    notify: number
    sent: boolean
}

type TodoType = {
    _id: string,
    userId: string,
    todo: string
}

type mailOptions = {
    from: string,
    to: string,
    subject: string,
    html: string
}
