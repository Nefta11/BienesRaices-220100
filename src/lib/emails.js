import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
dotenv.config({ path: 'src/.env' })

var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const emailRegister = async (userData) => {
    const { name, email, token } = userData
    console.log(`Intentando enviar el correo electronico de activacion cuenta al usuario ${userData.email}`)
    //Creando y enviando el correo
    await transport.sendMail({
        from: '220100@utxicotepec.edu.mx',
        to: email,
        subject: 'RealState-220100: Verify your account',
        text: 'Welcome to Real State-220100, to continue is mandatory that you click on the link below to activate your account.',
        html: `
        <div style="background-color: #FBCAEA; padding: 20px;">
        <header style=" background-color: #F21651; padding: 20px;">
            <p style="color: #3D1773; font-size: 24px; font-weight: bold; text-align: center;">Hello, ${name}</p>
        </header>
        <p style="color: #150E40;">Thank you for choosing to search, sell, and buy properties. If you want to continue using our platform, please click the link below:</p>
        <a href="http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/login/confirm/${token}" style="background-color: #F2059F; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Click here to activate your account</a>
        <p style="color: #150E40;">Best regards</p>
        <p style="color: #F21651;">*If you did not create this account, please ignore this message</p>
        <br>
        <br>
        <p style="color: #150E40; font-weight: bold;">Neftali Arturo Hernandez Vergara</p>
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/Firma_de_Joaqu%C3%ADn_Baranda.png" style="display:block: margin:20px 0; width:100px; heigth:auto;"></img>
        <table>
            <tr>
                <td>
                    <a href="https://www.facebook.com/profile.php?id=100008252550294&locale=es_LA"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png" alt="Facebook" style="width: 30px; height: 30px; color: #3D1773;"></a>
                </td>
                <td>
                    <a href="https://github.com/Nefta11"><img src="https://play-lh.googleusercontent.com/PCpXdqvUWfCW1mXhH1Y_98yBpgsWxuTSTofy3NGMo9yBTATDyzVkqU580bfSln50bFU" alt="GitHub" style="width: 30px; height: 30px; color: #3D1773;"></a>
                </td>
                <td>
                    <a href="https://www.instagram.com/nefth_07/"><img src="https://img.freepik.com/vector-gratis/instagram-nuevo-icono_1057-2227.jpg" alt="Instagram" style="width: 30px; height: 30px; color: #3D1773;"></a>
                </td>
            </tr>
        </table>
    
        <p style="color: #150E40; font-weight: bold;">CEO OF RealState-220100</p>
        <br>
        <footer>
        &copy; RealState-220100
        </footer>
    </div>
    
        `,
    });


}

const emailPasswordRecovery = async (userData) => {
    const { name, email, token } = userData
    console.log(`Intentando enviar un correo electronico dpara la recuperación de cuenta del usuario: ${email}`)
    //Creando y enviando el correo
    await transport.sendMail({
        from: '220100@utxicotepec.edu.mx',
        to: email,
        subject: 'RealState-220100: Verify your account',
        text: 'Welcome to Real State-220100, to continue is mandatory that you click on the link below to activate your account.',
        html: `
        <div style="background-color: #FBCAEA; padding: 20px;">
        <header style=" background-color: #F21651; padding: 20px;">
            <p style="color: #3D1773; font-size: 24px; font-weight: bold; text-align: center;">Hello, ${name}</p>
        </header>
        <p style="color: #150E40;">Thank you for choosing to search, sell, and buy properties. To continue using our platform, please click the link below to activate your account:</p>
        <a href="http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/login/update-password/${token}" style="background-color: #F2059F; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Click here to activate your account</a>
        <p style="color: #150E40;">Best regards</p>
        <p style="color: #F21651;">*If you did not create this account, please ignore this message</p>
        <br>
        <br>
        <p style="color: #150E40; font-weight: bold;">Neftali Arturo Hernandez Vergara</p>
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/Firma_de_Joaqu%C3%ADn_Baranda.png" style="display:block: margin:20px 0; width:100px; heigth:auto;"></img>
        <table>
            <tr>
                <td>
                    <a href="https://www.facebook.com/profile.php?id=100008252550294&locale=es_LA"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png" alt="Facebook" style="width: 30px; height: 30px; color: #3D1773;"></a>
                </td>
                <td>
                    <a href="https://github.com/Nefta11"><img src="https://play-lh.googleusercontent.com/PCpXdqvUWfCW1mXhH1Y_98yBpgsWxuTSTofy3NGMo9yBTATDyzVkqU580bfSln50bFU" alt="GitHub" style="width: 30px; height: 30px; color: #3D1773;"></a>
                </td>
                <td>
                    <a href="https://www.instagram.com/nefth_07/"><img src="https://img.freepik.com/vector-gratis/instagram-nuevo-icono_1057-2227.jpg" alt="Instagram" style="width: 30px; height: 30px; color: #3D1773;"></a>
                </td>
            </tr>
        </table>
    
        <p style="color: #150E40; font-weight: bold;">CEO OF RealState-220100</p>
        <br>
        <footer>
        &copy; RealState-220100
        </footer>
    </div>
        `,
    });

}

    const emailPaswordCheck = async (userData) => {
        const { name, email, token } = userData
        console.log(`Intentando enviar el correo electronico de activacion cuenta al usuario ${userData.email}`)
        //Creando y enviando el correo
        await transport.sendMail({
            from: '220100@utxicotepec.edu.mx',
            to: email,
            subject: 'RealState-220100: Verify your account',
            text: 'Welcome to Real State-220100, to continue is mandatory that you click on the link below to activate your account.',
            html: `
            <div style="background-color: #FBCAEA; padding: 20px;">
            <header style=" background-color: #F21651; padding: 20px;">
                <p style="color: #3D1773; font-size: 24px; font-weight: bold; text-align: center;">Hello, ${name}</p>
            </header>
            <p style="color: #150E40;">Your password has been updated successfully</p>
            <a href="http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/login" style="background-color: #F2059F; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Click to login</a>
            <p style="color: #150E40;">Best regards</p>
            <p style="color: #F21651;">*If you did not create this account, please ignore this message</p>
            <br>
            <br>
            <p style="color: #150E40; font-weight: bold;">Neftali Arturo Hernandez Vergara</p>
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/Firma_de_Joaqu%C3%ADn_Baranda.png" style="display:block: margin:20px 0; width:100px; heigth:auto;"></img>
            <table>
                <tr>
                    <td>
                        <a href="https://www.facebook.com/profile.php?id=100008252550294&locale=es_LA"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png" alt="Facebook" style="width: 30px; height: 30px; color: #3D1773;"></a>
                    </td>
                    <td>
                        <a href="https://github.com/Nefta11"><img src="https://play-lh.googleusercontent.com/PCpXdqvUWfCW1mXhH1Y_98yBpgsWxuTSTofy3NGMo9yBTATDyzVkqU580bfSln50bFU" alt="GitHub" style="width: 30px; height: 30px; color: #3D1773;"></a>
                    </td>
                    <td>
                        <a href="https://www.instagram.com/nefth_07/"><img src="https://img.freepik.com/vector-gratis/instagram-nuevo-icono_1057-2227.jpg" alt="Instagram" style="width: 30px; height: 30px; color: #3D1773;"></a>
                    </td>
                </tr>
            </table>
        
            <p style="color: #150E40; font-weight: bold;">CEO OF RealState-220100</p>
            <br>
            <footer>
            &copy; RealState-220100
            </footer>
        </div>
        
            `,
        });
    
    
    

}


export { emailRegister, emailPasswordRecovery,emailPaswordCheck}


