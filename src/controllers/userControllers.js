import User from "../models/User..js"
import { check, validationResult } from 'express-validator'
import { generateToken, generateJWT } from "../lib/tokens.js"
import { emailRegister, emailPasswordRecovery,emailPaswordCheck  } from "../lib/emails.js"
import bcrypt from 'bcrypt';


const formLogin = (request, response) => {
    response.render("../views/auth/login.pug", {
        page: "Login",
        isLogged: false,
    })
}

const formPasswordUpdate = async (request, response) => {
    const { token } = request.params;
    const user = await User.findOne({ where: { token } })
    console.log(user);
    if (!user) {
        response.render('auth/confirm-account', {
            page: 'password recovery',
            error: true,
            msg: 'We have found some issues and could not verify your account.',
            button: 'Access denied'

        })
    }

    response.render("auth/password-update", {
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
    await check("password").notEmpty().withMessage("This fieldis required").isLength({ min: 8, max: 20 }).withMessage("The password must have 8 characterat lest ").run(request)
    await check("password2").notEmpty().withMessage("This fieldis required").isLength({ min: 8, max: 20 }).withMessage("The password most have 8 haracters at least").equals(request.body.password).withMessage("Both passwords felds must be the same").run(request)
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
            type: "sucess"
        })

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
            button: "Access denied"
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

const updatePassword = async (req, res) => {
    console.log("Guardando password");

    await check("password").notEmpty().withMessage("YOUR PASSWORD IS REQUIRED").isLength({ min: 8 }).withMessage("YOUR PASSWORD MUST HAVE 8 CHARACTERS AT LEAST").run(req)
    await check("password2").notEmpty().withMessage("YOUR PASSWORD IS REQUIRED").isLength({ min: 8 }).withMessage("YOUR PASSWORD MUST HAVE 8 CHARACTERS AT LEAST").equals(req.body.password).withMessage("BOTH PASSWORDS FIELDS MUST BE THE SAME").run(req)
    let resultValidate = validationResult(req);
    if (resultValidate.isEmpty()) {
        const { token } = req.params
        const { password } = req.body
        const user = await User.findOne({ where: { token } })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        user.token = null;
        await user.save();
        
        res.render('auth/confirm-account.pug', {
            page: "Password recovery",
            button: "Back to login",
            msg: "The password has been change succesfully"
        })
        emailPaswordCheck({
            name: user.name,
            email: user.email,
        })
    }
    

    else {
        res.render("auth/password-update.pug", ({
            page: "New account",
            errors: resultValidate.array()

        }))
    }

}

const emailChangePassword = async (req, res) => {
    console.log(`El usuario ha solicitado cambiar su contraseña por lo que se le enviara un correo electronico a ${req.body.email} con la liga para actualizar su contraseña `)
    await check("email").notEmpty().withMessage("Your email is required").isEmail().withMessage("This is not email format").run(req)
    let resultadoValidacion = validationResult(req)


    const { name, email } = req.body;


    if (resultadoValidacion.isEmpty()) {
        const userExists = await User.findOne({
            where: {
                email: email
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
            console.log("Envio de correo")
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
        res.render('auth/recovery', {
            page: 'Status verification.',
            error: false,
            msg: 'Your account has been confirmed successfuly.',
            button: 'Now you can login',
            errors: resultadoValidacion.array(), user: {
                name: req.body.name,
                email: req.body.email
            },




        });
    }

    return 0;
}

const authenticateUser = async (request, response) => {
    //Verificar los campos de correo y contraseña
    await check("email").notEmpty().withMessage("Email field is required").isEmail().withMessage("This is not in email format").run(request)
    await check("password").notEmpty().withMessage("Password field is required").isLength({ max: 20, min: 8 }).withMessage("Password must contain between 8 and 20 characters").run(request)

    // En caso de errores mostrarlos en pantalla
    let resultadoValidacion = validationResult(request)
    if (resultadoValidacion.isEmpty()) {
        const { email, password } = request.body;
        console.log("El usuario: ${email} esta intentando acceder a la plataforma")
        //TODO Verificar que el usuario esta registrado en la base de datos
        const userExists = await User.findOne({ where: { email } })
        //TODO En caso de que no exista mostrar pagina de error
        if (!userExists) {
            console.log("El ususario no existe")
            response.render("../views/auth/login.pug", {
                page: "Login",
                errors: [{ msg: "The user associated to: ${email} was not found" }],
                user: {
                    email: request.body.email
                }
            })
        } else {
            console.log("El usuario existe")
            if (!userExists.verified) {
                console.log("Existe, pero no esta verificado");
                //TODO Pintar la pagina de error
                response.render("../views/auth/login.pug", {
                    page: "Login",
                    errors: [{ msg: "The user associated to: ${email} was found but not verified" }],
                    user: {
                        email: request.body.email
                    }
                })
            } else {
                if (userExists.verifyPassword(password)) {
                    response.render("../views/auth/login.pug", {
                        page: "Login",
                        errors: [{ msg: "User and password does not match" }],
                        user: {
                            email: email
                        }
                    })
                } else {
                    console.log(`El usuario: ${email} Existe y esta autenticado`)
                    //TODO 
                    const token = generateJWT(userExists.id);
                    response.cookie('_token', token, {
                        httpOnly: true,//SOLO VIA NAVEGADOR, A NIVEL API NO
                        //secure:true // solo se habiitara en caso de contar con un certificado http
                    }).redirect('/login/home')
                }
            }

        }

    } else {
        response.render("../views/auth/login.pug", {
            page: "Login",
            errors: resultadoValidacion.array(),
            user: {
                email: request.body.email
            }
        })
    }

    return 0;
}

const userHome = (req, res) => {
    res.render('user/home')
}


export { formLogin, formRegister, formPasswordRecovery, insertUser, confirmAccount, updatePassword, emailChangePassword, userHome, formPasswordUpdate, authenticateUser };