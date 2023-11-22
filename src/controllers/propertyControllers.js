import Price from "../models/price.js";
import Category from "../models/category.js";


const formProperty = async (req,res) =>{
    //TODO: Obtener los precios y categorias actuales para enviarlos a el formulario (vistas)

    const [categories, prices]= await Promise.all([Category.findAll(),Price.findAll()])

    res.render('properties/create.pug',{
        page:'New property',
        showHeader:true,
        categories,prices
    });
}

export {formProperty};