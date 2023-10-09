import express from 'express';

import {formLogin, formRegister} from '../controllers/userControllers.js';
const router = express.Router();

//definimos las rutas
router.get("/",(request,response) => {
    response.render("auth/login.pug",{
    isLogged: true})})


    export default router;
