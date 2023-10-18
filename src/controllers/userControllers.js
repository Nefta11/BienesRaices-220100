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
    response.redirect('/login')
    console.log("Intentando registrar los datos del usuario en la Base de Datos")
    console.log(`Nombre: ${request.body.name}`)
    console.log(`password: ${request.body.password}`)
    await check("name").notEmty().withMessage("This fieldis required").run(request)
    response.json(validationResult(request))
    let nemUser= await User.create(request.body)

}

export { formLogin, formRegister, formPasswordRecovery, insertUser };