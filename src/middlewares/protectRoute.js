import router from "../routes/propertyesRoutes.js";
import JsonWebToken from "jsonwebtoken";
import dotenv from 'dotenv';
import User from '../models/User..js'
import { where } from "sequelize";

dotenv.config({
    path:'src/.env'
});

const protectRoute = async (req,res,next) =>{
    console.log("Hola desde el middleware");

    const {_token} = req.cookies
    //TODO VERIFICAR QUE EL TOKEN EXISTA
    if(!_token){
        return res.redirect('/login');
    }
    //VERIFICAR QUE EL TOKEN ESTE CORRECTO
    try {
        const decoded =  JsonWebToken.verify(_token,process.env.JWT_SECRET_HASH_STRING)
        const loggedUser =await User.scope('deletePassword').findByPk(decoded.userID)
        if(loggedUser){
            req.loggedUser= loggedUser;
        }else{
            return res.redirect('/login')
        }
        console.log(loggerUser)
    } catch (error) {
        console.log(err);
    }

    //TODO ALMACENAR EL USUARIO EN EL REQUEST
  

    next();
}

export {protectRoute}