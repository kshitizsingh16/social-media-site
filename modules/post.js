import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    //include the arrays of ids of all comments in this post schema itself
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
}, {
    timestamps: true,
    // bufferCommands: false,
    // autoCreate: false,
    // capped: {size: 1024},
});

const Post = mongoose.model("Post", postSchema);

export default Post;