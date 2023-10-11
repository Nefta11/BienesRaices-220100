//COMON JS

// Importanto la libreria de express para activar la comunicación  HTTP
//cs= require("express")
import express from "express";  //ECMS6
import generalRoutes from './routes/generalRoutes.js'
import userRoutes from './routes/userRoutes.js'

//INSTANCIAMOS EL MODULO EXPRESS DE LA LIBRERIA PARA DEFINIR EL SERVIDOR QUE ATENDERA LAS PETICIONES
const app = express();
const port=3000;    //definimos el puerto, la maquina tinen 64400 puertos mtb y los primeros 1024 los ocupra el s.o

//Agregar y configurar el TemplateEngine 
app.set('view engine','pug')
app.set('views','./src/views')

app.use(express.static('./src/public'))
//mvc -model view contoller //
app.listen(port,(request,response ) => //Le indicamos a la instancia express que comience a escuchar peticiones

{
console.log(`El servicio HTTP ha sido iniciado.../n 
El servicio esta escuchando por el puerto: ${port}`)
}) // Le indicamos a la instancia express que comience a escuchar las peticiones


//Routing- controlando las peticiones que se reciben por medio del endpoint (url)
app.use('/',generalRoutes)
app.use('/login',userRoutes)


//queda pendiente re.render() -> que pinta una interfaz gráfica a través de un motor de plantillas (template engine)


















































































