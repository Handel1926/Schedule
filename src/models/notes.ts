import mongoose, { Schema, model } from "mongoose";



const noteSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "CalUserSchema"},
    title: String,
    note: String,
    date: String,
    time: String,
    display: Boolean
})


const Note = mongoose.models.notes || model("notes", noteSchema)

export default Note