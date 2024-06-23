import Post from "../modules/post.js";
import User from "../modules/user.js";

// await User.createCollection();
// await Post.createCollection();

export const Home = async (req, res)=>{
    try {
        const posts = await Post
        .find({})
        .maxTimeMS(30000)
        .populate("user")
        .populate({
            path: "comments",
            populate: {
                path: "user",
            }
        });

        const users = await User.find({});

        // if(posts.length && users.length)
        return res.render("layout", {
            body: "home", 
            title: "Post",
            posts: posts,
            all_users: users,
            
        });

        // else{
        //     return res.render("user_signup");
        // }

    } catch (error) {
        console.log(`error in home page of home controller: ${error}`);
        return res.redirect("back");
    }
}
// {
    // title: "Post",
    // posts: posts,
    // all_users: users,
// }



// export const Home = async (req, res) => {
    // res.cookie("user_id", 25);
    // console.log(req.cookies);

    // const post = await Post.find({});
    
        // if(err){
        //     console.log(`error in finding post: ${post}`);
        // }
        // else{
            // return res.render("home", {
            //     title: "Post",
            //     posts: post,
            // });
        // }
    

    


//     //populating the user of each post
//     Post
//     .find({})
//     .populate("user")
//     .populate({
//         path: "comments",
//         populate: {
//             path: "user",
//         }
//     })
//     .exec((err, posts)=>{
//         User.find({}, (err, users)=>{
//             return res.render("home", {
//                 title: "Post",
//                 posts: posts,
//                 all_users: users,
//             })
//         })
//     })

// }





