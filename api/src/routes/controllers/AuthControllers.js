const { Usuario } = require('../../db');
const bcrypt = require('bcryptjs');

const compare = async (passwordPlain, hashPassword) =>{
    return await bcrypt.compare(passwordPlain, hashPassword)
}

const loginCtrl = async (req, res) => {
    const { email, password } = req.body;

    try{
        const user = await Usuario.findOne({where:{email}});

        if(!user) return res.status(409).send({error: "Usuario o contraseña incorrectos"})

        const checkPassword = await compare(password, user.password);
        // const tokenSession = await tokenSign(user);
        if(!checkPassword) return res.status(409).send({error: "Usuario o contraseña incorrectos"})

        return res.status(200).send(checkPassword)
    }catch(error){
        return res.status(400).send({error: error.message})
    }
}

module.exports = {
    loginCtrl
}