import mongoose, { Schema, model } from "mongoose";


const calUserSchema = new Schema({
    _id: Schema.Types.ObjectId,
    username: String,
    email: {
        type: String,
        required: [true, "Please provide your Email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide your Email"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    todoList: [{type: Schema.Types.ObjectId, ref: "Todo"}],
    noteList: [{type: Schema.Types.ObjectId, ref: "Note"}],
    ReminderList: [{type: Schema.Types.ObjectId, ref: "Reminder"}],
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
})

const CalUser = mongoose.models.calusers || model("calusers", calUserSchema)

export default CalUser