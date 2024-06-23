import express from "express";
import {Home} from "../controllers/home_controller.js";
import user from "./user.js"
import post from "./post.js"
import comment from "./comment.js";

const app = express();
const router = express.Router();

console.log("index router loaded");

router.get("/", Home);
router.use("/user", user);
router.use("/post", post);
router.use("/comment", comment);

export default router;



