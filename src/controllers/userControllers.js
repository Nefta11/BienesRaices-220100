


const formLogin = (request, response) =>{
    response.render("auth/login.pug", {
        isLogged : true
    })}

const formRegister = (request, response) =>{
    response.render("auth/register.pug", {
        page: "Creating a new account..."
    })}

export { formLogin, formRegister };