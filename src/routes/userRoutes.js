import express from 'express'
import { formLogin, formRegister,formPasswordRecovery,userHome, insertUser, confirmAccount,formPasswordUpdate,emailChangePassword,updatePassword,authenticateUser} from "../controllers/userControllers.js";

const router = express.Router();

router.get("/", formLogin)
router.get("/register", formRegister)
router.get("/password-recovery", formPasswordRecovery)
router.post("/password-recovery", emailChangePassword)

router.get("/update-password/:token", formPasswordUpdate);
router.post("/update-password/:token", updatePassword);

router.post("/register",insertUser)
router.get("/confirm/:token",confirmAccount)
router.post("/",authenticateUser)
router.get("/home",userHome)// vISTA DE CADA USUARIO 


export default router;