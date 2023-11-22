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
    const queryResetCategoryID= "alter table tbc_categories auto_increment = 1;"
    const queryResetPriceID= "alter table tbc_prices auto_increment = 1;"
    await Promise.all([Category.destroy({where:{},truncate:false}),Price.destroy({where:{},truncate:false})])

    await Promise.all([db.query(queryResetCategoryID),db.query(queryResetPriceID)])

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


