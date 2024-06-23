import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    }
}, {
    timestamps: true,
    // bufferCommands: false,
    // autoCreate: false,
    // capped: {size: 1024},
})

const User = mongoose.model("User", userSchema);

export default User;
