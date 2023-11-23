import Price from "../models/price.js";
import Category from "../models/category.js";

import { check } from "express-validator";

const formProperty = async (req,res) =>{
    //TODO: Obtener los precios y categorias actuales para enviarlos a el formulario (vistas)

    const [categories, prices]= await Promise.all([Category.findAll(),Price.findAll()])

    res.render('properties/create.pug',{
        page:'New property',
        showHeader:true,
        categories,prices
    });
}

const saveNewProperty = async (req,res) =>{
await check("title").notEmpty().withMessage("The title is required").isLength({min:15, max:150}).withMessage("The title property must have between 15 and 150 characters").run(req)
await check("description").notEmpty().withMessage("The description is required").run(req)
console.log(`L a categoria es esta : ${typeof req.body.Category}`)
await check("category").notEmpty().withMessage("All properties must be categorized").isInt({min:1, max:5}).withMessage("The category is unknown").run(req)
await check("priceRange").notEmpty().withMessage("All properties must be").isInt({min:1,max:8}).withMessage("The price is unknow").run(req)
await check("nRooms").notEmpty().withMessage("All properties must be").isInt({min:0,max:10}).withMessage("The number of rooms is unknow").run(req)
await check("nwc").notEmpty().withMessage("All properties must be").isInt({min:0,max:5}).withMessage("The number of wc is unknow").run(req)
await check("parkingLot").notEmpty().withMessage("All properties must be").isInt({min:1,max:8}).withMessage("").run(req)
await check("street").notEmpty().withMessage("All properties must be").isInt({min:1,max:8}).withMessage("").run(req)

console.log()
}

export {formProperty, saveNewProperty};