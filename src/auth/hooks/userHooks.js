import { UseFetchRegisterUser, UseFetchLogin } from "../helpers/fetchUsers";

const md5 = require('md5');

const PasswordValidate = (firstPassword, secondPassword) => {
    if (firstPassword === secondPassword) return true
    return false
}

const encryptPassword = (password) => {
    return md5(password)
}

const CreateUser = async (username, password, email, rol) =>{
     const registerResult = await UseFetchRegisterUser(username, password, email, rol)
     return registerResult
}

const login = async (email, password) => {
    const loginResult = await UseFetchLogin(email, password)
    if (!loginResult.Email){
        return loginResult.Msg
    }
    else{
        return loginResult
    }
}

const validateEmail = (email) =>{
    const validEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    return validEmail.test(email);
}


const UserHooks = {
    PasswordValidate,
    encryptPassword,
    login,
    CreateUser,
    validateEmail
}

export default UserHooks