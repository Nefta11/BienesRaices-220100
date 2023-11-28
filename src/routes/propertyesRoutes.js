import express  from "express";
import {protectRoute} from "../middlewares/protectRoute.js"
import {formProperty, saveNewProperty} from '../controllers/propertyControllers.js'
const router = express.Router();


router.get('/create',protectRoute,formProperty)

router.post('/create',protectRoute,saveNewProperty)

export default router
