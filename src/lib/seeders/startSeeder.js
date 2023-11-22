import {exit} from 'node:process'
import Category from '../../models/category.js'
import categories from './categorySeed.js'
import db from '../../config/bd.js'

import Price from '../../models/price.js'
import prices from './priceSeed.js'

const importData = async () => {
    try{
        //Autenticar
    await db.authenticate()
        //Generar las columnas
    await  db.sync()
        // Importar los datos
    await Promise.all( [
    Category.bulkCreate(categories),
    Price.bulkCreate(prices)])
    console.log("Se han importado los datos de las tabla catalogo de manera correcta ")
    exit()

    }catch(error){
        console.log(error);
        exit(1);
    }
}


const deleteData = async()=>{
    try {
        
    } catch (error) {
        console.log(error);
        exit(1);
    }
}

if (process.argv[2] === "-i"){
    importData()
}


