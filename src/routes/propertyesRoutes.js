import express  from "express";
import {protectRoute} from "../middlewares/protectRoute.js"
import {formProperty, saveNewProperty,addImages} from '../controllers/propertyControllers.js'
const router = express.Router();




router.get('/create',protectRoute,formProperty)
router.get('/addImage',protectRoute,addImages)
router.post('/create',protectRoute,saveNewProperty)

export default router
