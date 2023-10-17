import { DataType, DataTypes } from "sequelize";
import db from '../config/bd.js'


const User=db.define('tbb_users' ,{
    name: {
        type: DataTypes.STRING,
        allowNull:false
    },

    email: {
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    token: {
       type: DataTypeS.STRING,
       default: ""
    },

    verified:{
        type:DataTypes.BOOLEAN,
        default:FALSE
    },

})

export default User


