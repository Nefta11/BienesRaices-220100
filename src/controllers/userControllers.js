import User from "../models/User..js"
import { check, validationResult } from 'express-validator'

const formLogin = (request,response) => {
    response.render("auth/login.pug",{
        page:"Login",
    isLogged : false})}

const formRegister = (request,response) => {
    response.render("auth/register.pug",
    {
        page : "Creating a new account..."
    })}

const formPasswordRecovery = (request,response) => {
    response.render("auth/password-recovery.pug",
    {
        page:"Password Recovery"
    })}    


const insertUser= async (request,response) =>{
//    response.redirect('/login')
    console.log("Intentando registrar los datos del usuario en la Base de Datos")
    console.log(`Nombre: ${request.body.name}`)
    console.log(`password: ${request.body.password}`)
    await check("name").notEmpty().withMessage("This fieldis required").run(request)
    await check("email").notEmpty().withMessage("This fieldis required").isEmail().withMessage("This is not emailformat").run(request)
    await check("password").notEmpty().withMessage("This fieldis required").isLength({min:8}).withMessage("The password must have 8 characterat lest ").run(request)
    await check("password2").notEmpty().withMessage("This fieldis required").isLength({min:8}).withMessage("The password most have 8characters at least").equals("password").withMessage("Bothpasswords felds must be the same").run(request)
    response.json(validationResult(request))
    console.log(`Se encontraron: ${validationResult.length} errores de validación`)
    
    let resultadoValidacion=validationResult(request)
    if (resultadoValidacion.isEmpty()){

    let nemUser= await User.create(request.body)}

}

export { formLogin, formRegister, formPasswordRecovery, insertUser };