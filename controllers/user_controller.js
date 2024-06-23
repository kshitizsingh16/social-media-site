import User from "../modules/user.js";

// await User.createCollection();

export const user = (req, res) => {
  return res.send("<h1>this is usercontroller user </h1>");
};

//sign up user
export const SignUp = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  } else return res.render("user_signup");
};


export const SignIn = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  } else return res.render("user_signin");
};



//profile of the user
export const Profile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      return res.render("user_profile", {
        title: "This is my Profile",
        profile_user: user,
      });
    } else {
      console.log(`cannot find the uesr in profile user controller`);
      return res.redirect("back");
    }
  } catch (error) {
    console.log(`error in profile in user controller: ${error}`);
    return res.redirect("back");
  }
};

//to get sigu up form data
export const Create = async (req, res) => {
  try {
    if (req.body.password !== req.body.confirm_password) {
      return res.redirect("back");
    }

    const getUser = await User.findOne({ email: req.body.email });

    if (!getUser) {
      const user = await User.create(req.body);
      console.log(user);
      return res.redirect("/user/sign-in");
    } else {
      console.log(`got the user: ${getUser}`);
      return res.redirect("/user/sign-in");
    }
  } catch (error) {
    console.log(`error in create in user controller: ${error}`);
    return res.redirect("back");
  }
};



//to get sign in form data
export const createSession = (req, res) => {
  return res.redirect("/");
};

export const destroySession = async (req, res) => {
  try {
    await req.logout((err) => {
      if (err)
        console.log(
          `error in logout in destroy session in user controller: ${err}`
        );
    }); //given by passport

    return res.redirect("/");
  } catch (error) {
    console.log(`error in desptroy session in user controller: ${error}`);
    return res.redirect("back");
  }
};

export const update = async (req, res) => {
  try {
    if (req.user.id === req.params.id) {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      return res.redirect("back");
    }
  } catch (error) {
    console.log(`error in update in user controller: ${error}`);
    return res.redirect("back");
  }
};

//earlier this was used to display the profile but below is used after using to display friends
// export const Profile = (req, res) => {
//     // if(req.cookies.user_id){
//     //     User.findById(req.cookies.user_id, (err, user)=>{
//     //         if(err){
//     //             console.log(error in getting the user from db: ${err});
//     //             return res.redirect("back");
//     //         }
//     //         if(user){
//                 return res.render("user_profile", {
//                     title: "this is my profile",
//                     user: user
//                 });
//     //         }
//     //     })
//     // }
//     // else{
//         // return res.redirect("/user/sign-in")
//     // }
//     // return res.render("user_profile");
// }

// export const Profile = (req, res) => {
//     User.findById(req.params.id, (err, user) => {
//         if (err) {
//             console.log(error in profile in usercontroller: ${err});
//         }
//         else {
//             return res.render("user_profile", {
//                 title: "this is my profile",
//                 profile_user: user
//             });
//         }
//     })
// }

// export const Create = (req, res) => {
//     if (req.body.password !== req.body.confirm_password) {
//         return res.redirect("back");
//     }

//     // User.findOne({ email: req.body.email }, (err, user) => {
//     //     if (err) {
//     //         console.log(error in creating the creating the user ${err});
//     //         return res.redirect("back");
//     //     }

//     //     if (!user) {
//     //         User.create(req.body, (err, user) => {
//     // if (err) {
//     //     console.log(error occured while signing up the user: ${err});
//     //     return res.redirect("back")
//     // }

//     // else{
//     //if created redirect to the sign in page
//     return res.redirect("/user/sign-in");
//     //             }
//     //         })
//     //     }

//     //     else{
//     //         return res.redirect("back");
//     //     }
//     // })
// }

// export const createSession = async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (user) {
//       if (user.password !== req.body.password) {
//         console.log("password does not match");
//         return res.redirect("back");
//       } else {
//         return res.redirect("/user/profile");
//       }
//     }
//   } catch (error) {
//     console.log(`does not have an account`);
//     return res.redirect("/user/sign-up");
//   }

// await User.findOne({ email: req.body.email }, (err, user) => {
//     if (err) {
//         console.log(`error in finding the user: ${err}`);
//         return res.redirect("back");
//     }
//     // user found
//     if (user) {
//         //password does not match
//         if (user.password != req.body.password) {
//             console.log(`passsword does not match`);
//             return res.redirect("back");
// }
// //create session
// res.cookie("user_id", user.id);
// return res.redirect("/user/profile");
// }

//     else {
//         //user not found
//         console.log(`does not have an account`);
// return res.redirect("/user/sign-up");
//     }
// })

// ---------------using passport js
// return res.redirect('/');
// };

// export const update = (req, res)=>{
//     if(req.user.id == req.params.id){
//         User.findByIdAndUpdate(req.params.id, req.body, (err, user)=>{
//             if(err){
//                 console.log(error in updating the user profile in usercontroller: ${err});
//             }
//             else{
//                 return res.redirect("back");
//             }
//         })
//     }
//     else{
//         return res.status(401).send("unauthorized");
//     }
// }
