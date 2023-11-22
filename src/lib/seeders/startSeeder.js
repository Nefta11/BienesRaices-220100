import {exit} from 'node:process'
import Category from '../../models/category.js'
import categories from './categorySeed.js'
import db from '../../config/bd.js'

const importData = async () => {
    try{
        //Autenticar
    await db.authentica()
        //Generar las columnas
    await  db.sync()
        //TODO: Importar los datos
    await Category.bulkCreate(categories)
    console.log("Se han importado los datos de las tabla catalogo de manera correcta ")
    }catch(error){
        console.log(error);
        exit(1);
    }
}


