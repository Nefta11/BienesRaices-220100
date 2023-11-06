import User from "../models/User..js"
import { check, validationResult } from 'express-validator'
import { generateToken } from "../lib/tokens.js"
import { emailRegister, emailPasswordRecovery } from "../lib/emails.js"


const formLogin = (request, response) => {
    response.render("../views/auth/login.pug", {
        page: "Login",
        isLogged: false,
    })
}

const formPasswordUpdate = (request, response) => {

    response.render("../views/auth/password-update.pug", {
        isLogged: false,
        page: "Password update",

    })
}

const formRegister = (request, response) => {
    response.render("auth/register.pug",
        {
            page: "Creating a new account...",
        })
}

const formPasswordRecovery = (request, response) => {
    response.render("auth/recovery.pug",
        {
            page: "Password Recovery",
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

    const { name, email, password } = request.body

    if (userExists) {
        response.render("auth/register.pug", {
            page: "Creating a new account...",
            errors: [{ msg: `El usuario con: ${request.body.email} already exist` }],
            user: {
                name: request.body.name,
                email: request.body.email
            },
        })
    }

    else if (resultadoValidacion.isEmpty()) {
        const token = generateToken()

        let newUser = await User.create({
            name, email, password, token
        });
        response.render("templates/message.pug", {
            page: "New Account Created",
            email: email,
            type:"success"
        });

        emailRegister({ email, name, token })

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
const confirmAccount = async (req, res) => {
    //TODO Verificar token
    const tokenRecived = req.params.token
    const userOwner = await User.findOne({ where: { token: tokenRecived } })

    if (!userOwner) {
        console.log("El token no existe")
        res.render('auth/confirm-account', {
            page: 'status verification',
            error: true,
            msg: 'we have found some inssues in account verification.',
        })
    }
    else {
        console.log("El token existe")
        userOwner.token = null;// Actualice de cadena vacia a null ya que me marcaba error de duplicidad.
        userOwner.verified = true;
        await userOwner.save();//esta operacion realiza el update en la base de datos
        res.render('auth/confirm-account', {
            page: 'status verification',
            error: false,
            msg: 'Your account has been confirmed succesfuly.'
        })
    }
}

const updatePassword = (req, res) => {
    return 0;
}

const emailChangePassword = async (req, res) => {
    console.log(`El usuario ha solicitado cambiar su contraseña por lo que se le enviara un correo electronico a ${req.body.email} con la liga para actualizar su contraseña `)
    await check("email").notEmpty().withMessage("Your email is required").isEmail().withMessage("This is not email format").run(req)
    let resultadoValidacion = validationResult(req)


    const { name, email } = req.body;


    if (resultadoValidacion.isEmpty()) {
        const userExists = await User.findOne({
            where: {
                email: req.body.email
            }
        });



        if (!userExists) {
            console.log(`El usuario: ${email} que esta intentando recuperar su contraseña no existe`);
            res.render("templates/message.pug", {
                page: "User nor found",
                message: `The user associated with: ${email} does not exist in database`,
                type: "error"
            });

        }
        else {
            const token = generateToken();
            userExists.token = token;
            userExists.save();

            //TODO: enviar el correo con el nuevo token
            emailPasswordRecovery({
                name: userExists.name,
                email: userExists.email,
                token: userExists.token
            })
            res.render('templates/message', {
                page: 'Email Send',
                msg: `We have sent an email to account: ${email}`,
                type: "success"
                // button:'Now you can login',

            });
        }
    }
    else {
        res.render('auth/confirm-account', {
            page: 'Status verification.',
            error: false,
            msg: 'Your account has been confirmed successfuly.',
            button: 'Now you can login',

        });
    }
    return 0;
}


export { formLogin, formRegister, formPasswordRecovery, insertUser, confirmAccount, updatePassword, emailChangePassword, formPasswordUpdate };