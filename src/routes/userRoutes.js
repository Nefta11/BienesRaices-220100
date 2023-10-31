import express from 'express'
import { formLogin, formRegister,formPasswordRecovery, insertUser, confirmAccount,emailChangePassword,updatePassword} from "../controllers/userControllers.js";
const router = express.Router();

router.get("/", formLogin)
router.get("/register", formRegister)
router.get("/password-recovery", formPasswordRecovery)
router.post("/update-recovery", emailChangePassword)
router.post("/password-recovery", updatePassword)
router.post("/register",insertUser)
router.get("/confirm/:token",confirmAccount)


export default router;