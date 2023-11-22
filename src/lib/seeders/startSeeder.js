import {exit} from 'node:process'
import Category from '../../models/category.js'
import categories from './categorySeed.js'
import db from '../../config/bd.js'

import Price from '../../models/price.js'
import prices from './priceSeed.js'
import { promises } from 'node:dns'

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
    await Promise.all([Category.destroy({where:{},truncate:false}),Price.destroy({where:{},truncate:false})])
    } catch (error) {
        console.log(error);
        exit(1);
    }
}

if (process.argv[2] === "-i"){
    importData()
}

if (process.argv[2] === "-d"){
    deleteData()
}


