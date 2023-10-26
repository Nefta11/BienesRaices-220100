import User from "../models/User..js"
import { check, validationResult } from 'express-validator'
import { generateToken } from "../lib/tokens.js"
import { emailRegister } from "../lib/emails.js"
import { request, response } from "express"
import nodemon from "nodemon"

const formLogin = (request, response) => {
    response.render("auth/login.pug", {
        page: "Login",
        isLogged: false
    })
}

const formRegister = (request, response) => {
    response.render("auth/register.pug",
        {
            page: "Creating a new account..."
        })
}

const formPasswordRecovery = (request, response) => {
    response.render("auth/password-recovery.pug",
        {
            page: "Password Recovery"
        })
}


const insertUser = async (request, response) => {
    //  response.redirect('/login')
    console.log("Intentando registrar los datos del usuario en la Base de Datos")
    console.log(`Nombre: ${request.body.name}`)
    console.log(`password: ${request.body.password}`)
    await check("name").notEmpty().withMessage("This fieldis required").run(request)
    await check("email").notEmpty().withMessage("This fieldis required").isEmail().withMessage("This is not emailformat").run(request)
    await check("password").notEmpty().withMessage("This fieldis required").isLength({ min: 8 }).withMessage("The password must have 8 characterat lest ").run(request)
    await check("password2").notEmpty().withMessage("This fieldis required").isLength({ min: 8 }).withMessage("The password most have 8 haracters at least").equals(request.body.password).withMessage("Both passwords felds must be the same").run(request)
    //response.json(validationResult(request))
    console.log(`Se encontraron: ${validationResult.length} errores de validación`)


    let resultadoValidacion = validationResult(request)
    const userExists = await User.findOne({ where: { email: request.body.email } })

    console.log(userExists)

    const {name,email,password} =request.body

    if (userExists) {
        response.render("auth/register.pug", {
            page: "Creating a new account...",
            errors: [{ msg: `El usuario con: ${request.body.email} already exist` }],
            user: {
                name: request.body.name,
                email: request.body.email
            }
        })
    }

    else if (resultadoValidacion.isEmpty()) {
        const token=generateToken()
        let newUser = await User.create({
            name,email,password,token
        })

        emailRegister({email,name,token})
        
        response.render("templates/message.pug", {
            page: "New Account Created",
            email: email
        });
        
    } else {
        response.render("auth/register.pug", {
            page: "Creating a new account...",
            errors: resultadoValidacion.array(),
            user: {
                name: request.body.name,
                email: request.body.email
            }
        })
    }

}
const confirmAccount = async (req,res) =>{
    //TODO Verificar token
    const tokenRecived= request.params.token
    const userOwner= await User.findOne({where:{token:tokenRecived}})
    
    if (!userOwner){
        console.log("El token no existe")
        res.render('auth/confirm-account',{
            page:'status verification',
            error: true,
            msg:'we have found some inssues in account verification.'
        })
    }    
    else{
        console.log("El token existe")
        res.render('auth/confirm-account',{
            page:'status verification',
            error: false,
            msg:'Your account has been confirmed succesfuly.'
        })
    }
}
export { formLogin, formRegister, formPasswordRecovery, insertUser, confirmAccount };