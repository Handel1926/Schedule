import mongoose, { Schema, model } from "mongoose";



const reminderSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "CalUserSchema"},
    email: String,
    reminder: String,
    date: String,
    time: String,
    notify: Number,
    sent: {
        type: Boolean,
        default: false
    }
})


const Reminder = mongoose.models.reminders || model("reminders", reminderSchema)

export default Reminder