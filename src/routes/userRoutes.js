import express from 'express'
import { formLogin, formRegister,formPasswordRecovery } from "../controllers/userControllers.js";
const router = express.Router();

router.get("/", formLogin)
router.get("/register", formRegister)
router.get("/password-recovery", formPasswordRecovery)

export default router;