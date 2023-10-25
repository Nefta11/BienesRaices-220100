import dotenv from 'dotenv'

dotenv.config({path:'src/.env'})
const emailRegister = async ()=>{

    console.log(`Intentando enviar el correo electronico de activacion cuenta al usuario ${user.Data.email}`)

    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.PASSWORD_PASSWORD
        }
      });

      const {name,email,token} = userData
      //Creando y enviando el correo
      await transport.sendMail({
        from: '220100@utxicotepec.edu.mx',
        to: email,
        subject: 'RealState-220100: Verify your account',
        text: 'Welcome to Real State-220100, to continue is mandatory that you click on link below to activate your account.',
        html:`<p>Hello, ${name}</p>
        <p>Thank you for chosing to search, sell and buy properties, if you want to continue use your plataform please click link below</p>
        <a href="#">Click here to activate your account</a>
        <p>Best regards</p>
        <p>Neftali Arturo Hernandez Vergara</p>
        <P>CEO OF RealState-220100</P>
        <p>*If you did not created this account please ignore this message </p>`
      })
}

export{emailRegister}


