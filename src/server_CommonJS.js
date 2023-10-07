//COMON JS

// Importanto la libreria de express para activar la comunicación  HTTP
//cs= require("express")

const express = require("express")


//INSTANCIAMOS EL MODULO EXPRESS DE LA LIBRERIA PARA DEFINIR EL SERVIDOR QUE ATENDERA LAS PETICIONES

const app = express();
const port=3000;  //definimos el puerto, la maquina tinen 64400 puertos mtb y los primeros 1024 los ocupra el s.o
app.listen(port, (request,response ) => //Le indicamos a la instancia express que comience a escuchar peticiones

{
    console.log(`El servicio HTTP ha sido iniciado.../n 
El servicio esta escuchando por el puerto: ${port}`)
}) // Le indicamos a la instancia express que comience a escuchar las peticiones


//Routing- controlando las peticiones que se reciben por medio del endpoint (url)
app.get('/',(request,response)=> response.send("Hola web"))

app.get('/quienEres',(request,response)=> response.send("Soy tu primera App web en arquitectura Soa (service object oriented)."))

app.get('/queUsas',(request,response)=> response.send("Estoy construida en el lenguaje de programacion JavaScrip, y utilizo el microservidor de Express."))

app.get('/misDatos',(rq,re) => re.json({nombre: "Su nombre completo aqui", fechaNacimiento:"2000-04-30", matricula:"220100"}))