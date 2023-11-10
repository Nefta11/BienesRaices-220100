//COMON JS

// Importanto la libreria de express para activar la comunicación  HTTP
//cs= require("express")
import express from "express";  //ECMS6
import generalRoutes from './routes/generalRoutes.js';
import userRoutes from './routes/userRoutes.js';
import db from './config/bd.js';
import User from './models/User..js';
import propertyRoutes from './routes/propertyesRoutes.js'
import dotenv from 'dotenv'
import helmet from "helmet";
import cookieParser from "cookie-parser";




dotenv.config({path:'src/.env'})

//INSTANCIAMOS EL MODULO EXPRESS DE LA LIBRERIA PARA DEFINIR EL SERVIDOR QUE ATENDERA LAS PETICIONES
const app = express();
const port=3000;    //definimos el puerto, la maquina tinen 64400 puertos mtb y los primeros 1024 los ocupra el s.o

//HABILITAR LA PROTECIÓN A TRAVES DE HELMET
app.use(helmet())


//Agregar y configurar el TemplateEngine 
app.set('view engine','pug')
app.set('views','./src/views')


try{
    db.authenticate();
    console.log("La conexión a labase de datos a sido exitosa")
    db.sync()
    console.log("Se han sincronizado las tablas existentes en la bvase de datos")
}catch(error){
    console.log("Hubo un error al intentar conectarme a la db.")
    console.log(error)
}


//HABILITAR COOKIEPARSER PARA LEER, ESCRIBIR Y ELIMINAR EN LAS COOKIES DEL NAVEGADOR
app.use(cookieParser({
    cookie:true
}))


app.use(express.static('./src/public'))
//mvc -model view contoller //

//Hbilitando el acceso a las propiedades del DOM
app.use(express.urlencoded({extended: false
}))


app.listen(process.env.SERVER_PORT,(request,response ) => //Le indicamos a la instancia express que comience a escuchar peticiones

{
console.log(`El servicio HTTP ha sido iniciado.../n 
El servicio esta escuchando por el puerto: ${process.env.SERVER_PORT}`)
}) // Le indicamos a la instancia express que comience a escuchar las peticiones


//Routing- controlando las peticiones que se reciben por medio del endpoint (url)
app.use('/',generalRoutes)
app.use('/login',userRoutes)
app.use('/properties',propertyRoutes)

//queda pendiente re.render() -> que pinta una interfaz gráfica a través de un motor de plantillas (template engine)


















































































