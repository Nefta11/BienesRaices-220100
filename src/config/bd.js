import Sequelize from "sequelize";

import dotenv from 'dotenv'
dotenv.config({path:'src/.env'})


const db = new Sequelize (process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,{
host:process.env.DB_HOST,
port:process.env.DB_PORT,
dialect:"mysql",
timezone:"America/Mexico_City",
define:{
    timestamps:true
},
pool:{
    max:5,//usuarios
    min:0,
    acquire: 30000,//Eltiempo que va a esperar a recibir una petición
    idle:10000,//suspende la conexion mientras no se ingresa nada.
},
operatorAliases:false

})

export default db;
