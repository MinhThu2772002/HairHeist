import express from "express";
import {
    createBookmarks,
    deleteBookmarks
} from "../controller/Bookmarks.js"
import {

    UserOnly,
    verifyUser
} from "../middleware/AuthUser.js";
const router = express.Router();

router.post('/bookmark/:id', createBookmarks);
router.delete('/bookmark/:id', deleteBookmarks);

export default router;