import { DataTypes } from "sequelize"
import db from '../config/bd.js'
import bycrypt from 'bcrypt'


const User = db.define('tbb_users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,
        defaultValue: ""
    },

    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },  

},{
    hooks:{beforeCreate:async(user)=>{
        const salt= await bycrypt.genSalt(10);
        user.password= await bycrypt.hash(user.password, salt)
    }}
})

export default User;


