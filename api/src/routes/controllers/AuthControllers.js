const { Usuario } = require('../../db');
const bcrypt = require('bcryptjs');
const firebaseAdmin = require('../../config/firebase-config');
const { generateId } = require('../utils/utils');
const jwt = require("jsonwebtoken")

const compare = async (passwordPlain, hashPassword) => {
    return await bcrypt.compare(passwordPlain, hashPassword)
}

const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if(!token) return next("Por favor inicie sesion antes de acceder a esta ruta");

        const verify = await jwt.verify(token.process.env.SECRET_KEY);
        req.user = await Usuario.findById(verify.id);
        next()
    } catch (error) {
        return next(error);
    }
}

const loginCtrl = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) return res.status(400).send({message: "Por favor introduce los datos necesarios"})
    
    try {
        const user = await Usuario.findOne({ where: { email } });

        if (!user) return res.status(409).send({ error: "Usuario o contraseña incorrectos" })

        const checkPassword = await compare(password, user.password);
        // const tokenSession = await tokenSign(user);
        if (!checkPassword) return res.status(409).send({ error: "Usuario o contraseña incorrectos" })

        const token = await jwt.sign({id: user._id}, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        });

        return res.cookie({"token": token}).status(200).send(user)
    } catch (error) {
        console.log({error})
        return res.status(400).send({ error: error.message })
    }
}

const federatedLoginCtrl = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const { userData } = req.body;

    try {
        const loggedUserData = await firebaseAdmin.auth().verifyIdToken(token).then((async (decodedToken) => {
            const uid = decodedToken.uid;
            const previousUser = await Usuario.findOne({
                where: {
                    federatedUID: uid
                }
            });

            //EN ESTE TIPO DE LOGIN, SI EL USUARIO NO EXISTE
            //SE CREA EN LA BASE DE DATOS Y SE RETORNAN LOS
            //DATOS CREADOS O YA EXISTENTES
            if (!previousUser && userData) {
                const newUser = await Usuario.create({
                    id: generateId(),
                    name: userData.displayName,
                    surname: "",
                    age: 0,
                    direction: "",
                    email: userData.email,
                    hasAJob: false,
                    occupation: "",
                    password: "",
                    federatedUID: uid,
                    photoURL: userData.photoURL
                })

                return newUser;
            }

            return previousUser;

        }))

        if (loggedUserData) {
            return res.status(200).json(loggedUserData);
        }
        return res.status(400).json({ message: 'Unauthorized' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

// la hacer get en esta ruta se desloguea al usuario
const getLogout = (req, res)=>{
    req.logout();
    res.send('logout exitoso');
}



module.exports = {
    loginCtrl,
    federatedLoginCtrl,
    isAuthenticated,
    getLogout
}