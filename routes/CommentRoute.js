import express from "express";
import {
    getCommentById,
    createComment,
    deleteComment
} from "../controller/Comment.js"
import {
    verifyUser
} from "../middleware/AuthUser.js";
const router = express.Router();

router.get('/comments/:id', getCommentById);
router.post('/comments/:id', createComment);
router.delete('/deletecomments/:id', deleteComment);

export default router;