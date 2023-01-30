import express from "express";
import {
    Login,
    Me

} from "../controller/Auth.js";

const router = express.Router();

router.post('/me', Me);
router.post('/login', Login);


export default router;