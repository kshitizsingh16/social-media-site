import Comment from "../modules/comment.js";
import Post from "../modules/post.js";

// await Comment.createCollection();
// await Post.createCollection();


//we need to add post id in commnet schema and comment id in post schema
export const create = async (req, res)=>{
    try {
        const post = await Post.findById(req.body.post);

        if(post){
            const comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id,
            })
            // console.log(comment);
            post.comments.push(comment);
            post.save();

            return res.redirect("back");
        }
        else{
            console.log(`error in create in comment controller cannot get post`);
            return res.redirect("back");
        }
    } catch (error) {
        console.log(`error occured in create comment in comment controller: ${error}`);
        return res.redirect("back");
    }
}




export const destroy = async (req, res)=>{
    try {
        const comment = await Comment.findOne({_id: req.params.id});
        // console.log(comment);

        if(comment){
            let postId = comment.post;
            await comment.deleteOne({_id: req.params.id});

            const post = await Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});

            return res.redirect("back");
        }
        else{
            console.log(`connot find comment in destroy on comment controller`);
            return res.redirect("back");
        }
    } catch (error) {
        console.log(`error in destroy in comment controller: ${error}`);
    }
}






// export const create = (req, res)=>{
//     Post.findById(req.body.post, (err, post)=>{
//         if(err){
//             console.log(`error finding post in comment controller: ${err}`);
//         }
//         else{
//             Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id,
//             }, (err, comment)=>{
//                 if(err){
//                     console.log(`error in creating comment in comment controller: ${err}`);
//                 }
//                 else{
//                     post.comments.push(comment);//in post it is comments
//                     post.save();

//                     return res.redirect("back");
//                 }
//             })
//         }
//     })
// }




// export const destroy = (req, res)=>{
//     Comment.findById(req.params.id, (err, comment)=>{
//         if(err){
//             console.log(`error in finding the cooment in comment controller: ${err}`);
//         }
//         else{
//             if(comment.user == req.user.id){
//                 let postId = comment.post;

//                 comment.remove();

//                 Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}}, (err, post)=>{
//                     if(err){
//                         console.log(`error in upadating the post in comment controller: ${err}`);
//                     }
//                     return res.redirect("back");
//                 })
//             }
//             else{
//                 return res.redirect("back");
//             }
//         }
//     })
// }
