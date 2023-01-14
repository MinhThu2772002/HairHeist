import express from "express";
import {
    LikeOrDislike
} from "../controller/Reaction.js"
import {
    verifyUser
} from "../middleware/AuthUser.js";
const router = express.Router();

router.post('/react/:id', verifyUser, LikeOrDislike);

export default router;