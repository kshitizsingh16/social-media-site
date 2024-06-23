import express from "express";
import { create, destroy } from "../controllers/comment_controller.js";
import passport from "../config/passport.js";

const router = express.Router();

router.post("/create", passport.checkAuthentication, create);
router.get("/destroy/:id", passport.checkAuthentication, destroy);


// router.post("/create", create);
// router.get("/destroy/:id", destroy);

export default router;