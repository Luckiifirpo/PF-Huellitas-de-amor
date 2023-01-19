const { Usuario } = require('../../db');
const bcryptjs = require('bcryptjs');

const encrypt = async (textPlain) => {
    const hash = await bcrypt.hash(textPlain, 10)
    return hash
}

const compare = async (passwordPlain, hashPassword) =>{
    return await bcrypt.compare(passwordPlain, hashPassword)
}

const registerCtrl = async (req, res) =>{
    try{
        const { email, password, name } = req.body;
        const passwordHash = await encrypt(password)
        const userRegister = await Usuario.create({
            email,
            name,
            password: passwordHash
        })

        res.send({data: userRegister})
    } catch(error){
        res.status(400).send({error: error.message})
    }
}

const loginCtrl = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await Usuario.findOne({email});
        if(!user){
            res.status(404)
            res.send({error: "Usuario no encontrado"})
        }
        const checkPassword = await compare(password, user.password);
        const tokenSession = await tokenSign(user);
        if(checkPassword){
            res.send({
                data: user
            })
            return
        }
        if(!checkPassword){
            res.status(409)
            res.send({error: "Contraseña incorrecta"})
            return
        }

    }catch(error){

    }
}

module.exports = {
    registerCtrl,
    loginCtrl
}