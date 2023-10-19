import { DataTypes } from "sequelize"
import db from '../config/bd.js'


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
        default: ""
    },

    verified: {
        type: DataTypes.BOOLEAN,
        default: false
    },  

})

export default User;


