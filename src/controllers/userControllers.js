


const formLogin = (request,response) => {
    response.render("auth/login.pug",{
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

export { formLogin, formRegister, formPasswordRecovery};