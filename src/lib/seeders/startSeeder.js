import {exit} from 'node:process'
import Category from '../../models/category.js'
import categories from './categorySeed.js'
import db from '../../config/bd.js'

const importData = async () => {
    try{
        //TODO: Autenticar
        //TODO: Generar las columnas
        //TODO: Importar los datos
    }catch(error){
        console.log(error);
        exit(1);
    }
}


