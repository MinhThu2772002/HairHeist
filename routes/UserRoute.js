import express from "express";
import {
    getUserById,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    updateVerified,
    UpdateProfileImg,
    UpdateLicenseImg,
    UpdateIntroduce
} from "../controller/Users.js"
import {

    designerOnly,
    verifyUser
} from "../middleware/AuthUser.js";
const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.patch('/users', verifyUser, updateUser);
router.patch('/users/ver', verifyUser, designerOnly, updateVerified);
router.patch('/users/up', verifyUser, UpdateProfileImg);
router.patch('/users/upli', verifyUser, designerOnly, UpdateLicenseImg);
router.patch('/users/intro', verifyUser, designerOnly, UpdateIntroduce);
router.delete('/users', verifyUser, deleteUser);

export default router;