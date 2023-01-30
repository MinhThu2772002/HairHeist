import express from "express";
import {
    getHairStyleById,
    getHairStyles,
    getHairStyleByKeyword,
    saveHairStyle,
    updateHairStyle,
    deleteHairStyle,


} from "../controller/HairStyles.js"
import {
    verifyUser,
} from "../middleware/AuthUser.js";
const router = express.Router();

router.get('/hairstyle', getHairStyles);
router.get('/hairstyle/:id', getHairStyleById);
router.post('/hairstylebykey', getHairStyleByKeyword);
router.post('/hairstyle', verifyUser, saveHairStyle);
router.patch('/hairstyle/:id', verifyUser, updateHairStyle);
router.delete('/hairstyle/:id', verifyUser, deleteHairStyle);

export default router;