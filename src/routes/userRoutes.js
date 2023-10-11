import express from 'express'
import { formLogin, formRegister } from "../controllers/userControllers.js";
const router = express.Router();

router.get("/", formLogin)
router.get("/register", formRegister)

export default router;