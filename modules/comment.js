import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    }
}, {
    timesptamps: true,
    // bufferCommands: false,
    // autoCreate: false,
    // capped: {size: 1024},
});


const Comment = mongoose.model("Comment", commentSchema);

export default Comment;