import express from "express";
import { user as userControllerUser, SignIn, SignUp, Create, Profile, createSession, destroySession, update } from "../controllers/user_controller.js";
import post from "./post.js";
import passport from "../config/passport.js";


const router = express.Router();
// router.use("/post", post);

console.log("user route is running");

// router.get("/profile", userControllerUser);
router.get("/sign-in", SignIn);
router.get("/sign-up", SignUp);
router.get("/profile/:id", passport.checkAuthentication, Profile);
// router.get("/profile/:id", Profile);
router.get("/sign-out", destroySession);
router.post("/update/:id", update);

router.post("/create", Create);
// router.post("/createSession", createSession);

router.post(
    "/createSession",
    passport.authenticate("local", {
        failureRedirect: "/user/sign-in"
    }),
    createSession
);




export default router;





