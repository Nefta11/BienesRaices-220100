import express  from "express";
import {formProperty} from '../controllers/propertyControllers.js'
const router = express.Router();


router.get('/create',formProperty)
//router.post('/create',saveNewProperty)

export default router
