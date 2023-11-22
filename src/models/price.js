import { DataTypes } from "sequelize";
import db from '../config/bd.js'

const Price = db.define('tbc_price',{
    name:{
        type: DataTypes.STRING(50),
        allowNull:false
    },
    status:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:true
    }
})

export default Price;