import express from "express";
import {
    createKeyword,
    deleteKeyword
} from "../controller/Keyword.js";
import {

    designerOnly,
    verifyUser
} from "../middleware/AuthUser.js";
const router = express.Router();

router.post('/keyword/:id', verifyUser, designerOnly, createKeyword);
router.delete('/keyword/:id', verifyUser, designerOnly, deleteKeyword);

export default router;