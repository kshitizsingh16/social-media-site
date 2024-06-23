import express from "express";
import { create, destroy} from "../controllers/post_controller.js";
import passport from "../config/passport.js";

const router = express.Router();

console.log("post router running");

router.get("/destroy/:id", passport.checkAuthentication, destroy);
// router.get("/destroy/:id", destroy);

router.post("/content", passport.checkAuthentication, create);
// router.post("/content", create);

export default router;
