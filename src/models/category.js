import { DataTypes } from "sequelize";
import db from '../config/bd.js'

const Category = db.define('tbc_categories',{
    name:{
        type: DataTypes.STRING(50),
        allowNull:false
    },
    status:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaulValue:true
    }
})

export default Category;