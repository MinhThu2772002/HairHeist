import express from "express";
import {
    getHairStyleById,
    getHairStyles,
    getHairStyleByKeyword,
    saveHairStyle,
    updateHairStyle,
    deleteHairStyle
} from "../controller/HairStyles.js"
import {
    verifyUser,
    designerOnly
} from "../middleware/AuthUser.js";
const router = express.Router();

router.get('/hairstyle', verifyUser, getHairStyles);
router.get('/hairstyle/:id', verifyUser, getHairStyleById);
router.post('/hairstylebykey', verifyUser, getHairStyleByKeyword);
router.post('/hairstyle', verifyUser, designerOnly, saveHairStyle);
router.patch('/hairstyle/:id', verifyUser, designerOnly, updateHairStyle);
router.delete('/hairstyle/:id', verifyUser, designerOnly, deleteHairStyle);

export default router;