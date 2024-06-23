import Post from "../modules/post.js"
import Comment from "../modules/comment.js"

// await Post.createCollection();
// await Comment.createCollection();

export const create = async(req, res)=>{
    try {
        const post = await Post.create({
            content: req.body.content,
            user: req.user._id,
        })

        return res.redirect("back");

    } catch (error) {
        console.log(`error occured in create in post controller cannot create post: ${error}`);
        return res.redirect("back");
    }
}



export const destroy = async(req, res)=>{
    try {
        const post = await Post.findOne({_id: req.params.id});
        // console.log(post.user.toString());
        // console.log(req.user.id);

        if(post.user.toString() === req.user.id){
            await post.deleteOne({_id: req.params.id});

            await Comment.deleteMany({post: req.params.id});

            return res.redirect("back");
        }
        else{
            console.log(`error in destroy in post controller connot find post `);
            return res.redirect("back");
        }
    } catch (error) {
        console.log(`error occured in destroy in post controller: ${error}`);
        return res.redirect("back");
    }
}




// export const create = (req, res)=>{
//     Post.create({
//         content: req.body.content,
//         user: req.user._id,
//     }, (err, post)=>{
//         if(err){
//             console.log(`error in creating the post: ${post}`);
//             return res.redirect("back");
//         }
//         return res.redirect("back");
//     })
// }




// export const destroy = (req, res)=>{
//     Post.findById(req.params.id, (err, post)=>{
//         if(err){
//             console.log(`error in finding the post in postcontroller: ${err}`);
//             return res.redirect("back");
//         }
//         else{
//             //post.user return a string and req.user.id also converts _id into string given by mongodb
//             if(post.user == req.user.id){
//                 post.remove();
//                 Comment.deleteMany({post: req.params.id}, (err)=>{
//                     console.log(`error in deleting the post: ${err}`);
//                     return res.redirect("back");
//                 })
                
//             }
//             else{
//                 return res.redirect("back");
//             }
//         }
//     })
// }