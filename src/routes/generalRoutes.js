import express, { request, response } from 'express'

const router = express.Router();

//router.get('/',(request,response)=> response.send("Hola web desde GET")) // descomentar para revisar practica de verbos htttp
router.get('/', (request, response) => response.render("layout/index.pug", {page: "Home"})); 


router.get('/quienEres',(request,response)=> response.send("Soy tu primera App web en arquitectura Soa (service object oriented)."))

router.get('/queUsas',(request,response)=> response.send("Estoy construida en el lenguaje de programacion JavaScrip, y utilizo el microservidor de Express."))

router.get('/misDatos',(rq,re) => re.json({nombre: "Neftali Arturo Hernandez Vergara", fechaNacimiento:"2000-04-30", matricula:"220100"}))

router.get('/diaHoy', (req, res) => res.json(`El dia de hoy es ${new Date().toLocaleDateString()} y la hora actual es ${new Date().toLocaleTimeString()}` ));


//Rutas a traves de POST
router.post('/',(request,response)=> response.send("Hi web from post verb"))

//RUTAS A TARVES DE PUT 
router.put('/',(request,response)=> response.send("you´re trying to update some properties of data using put "))

//RUTAS A TARVES DE PATCH
router.patch('/',(request,response)=> response.send("HI, YOU'RE TRYING TO UPDATE ALL DATA OBJECT THROUGH PATCH"))


//RUTAS A TARVES DE DELETE
router.delete('/',(request,response)=> response.send("ARE YOU SURE THAT YOU EANT TO DELETE DATA?"))


export default router;