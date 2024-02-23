import { randomUUID } from 'crypto';
import mongoose, { Schema } from 'mongoose';

const todoSchema = new Schema({
    taskName: String,
    isCompleted: Boolean,
}, {
    timestamps: true
})
const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema)
export default Todo;