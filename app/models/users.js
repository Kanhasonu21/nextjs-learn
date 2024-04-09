import mongoose, { Schema } from 'mongoose';

const usersSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})
const Users = mongoose.models.Users || mongoose.model("Users", usersSchema)
export default Users;