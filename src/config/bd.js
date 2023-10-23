import Sequelize from "sequelize";


const db = new Sequelize ("rs-220100","Neftali","1234567",{
host:"localhost",
port:"3307",
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


/* if errors
            div(class="max-w-md mx-auto md-10")
                each error in errors
                 p.bg-red-100.border.border-red-400.text-red-700.px-4.py-3.rounded.relative(role="alert")
                    strong.font-bold Holy smokes!
                    span(class=(error.msg ? 'block sm:inline' : ''))= error.msg
                    span.absolute.top-0.bottom-0.right-0.px-4.py-3
                        svg.fill-current.h-6.w-6.text-red-500(role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20")
                        title Close
                        path(d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z") */