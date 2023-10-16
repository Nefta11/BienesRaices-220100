import Sequelize from "sequelize";


const db = new Sequelize ("rs-220100","Neftali","1234567",{
host:"localhost",
port:"3307",
dialect:"mysql",
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
