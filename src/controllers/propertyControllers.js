import Property from "../models/property";
import Category from "../models/category";


const formProperty =(req,res) =>{
    res.render('properties/create.pug',{
        page:'New property',
        showHeader:true
        
    });
}

export {formProperty};