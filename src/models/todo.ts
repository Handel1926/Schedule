import mongoose, { Schema, model } from "mongoose";



const TodoSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "CalUserSchema"},
    todo: String
})


const Todo = mongoose.models.todos || model("todos", TodoSchema)

export default Todo