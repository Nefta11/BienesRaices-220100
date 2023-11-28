import router from "../routes/propertyesRoutes";
import JsonWebToken from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config({
    path:'src/.env'
});

const protectRoute = async (req,res,next) =>{
    console.log("Hola desde el middleware");

    const {_cookie} = req.cookies
    //TODO VERIFICAR QUE EL TOKEN EXISTA
    if(!_token){
        return res.redirect('/login');
    }
    //VERIFICAR QUE EL TOKEN ESTE CORRECTO
    try {
        const decoded =  JsonWebToken.verify(_token,process.env.JWT_SECRET_HASH_STRING)
    } catch (error) {
        
    }
    next();
}

export {protectRoute}