const { Usuario } = require('../../db');
const bcrypt = require('bcryptjs');
const firebaseAdmin = require('../../config/firebase-config');
const { generateId } = require('../utils/utils');
const jwt = require("jsonwebtoken");
const mailer = require('./MailerController');
const { transporter } = require("../utils/mailer");


const verifyToken = async (token) => {
    try{
        return jwt.verify(token, process.env.SECRET_KEY)
    }catch(error){
        return null
    }
}


const compare = async (passwordPlain, hashPassword) => {
    return await bcrypt.compare(passwordPlain, hashPassword)
}


const checkRole = (roles) => async (req, res, next) =>{
    try{
        const token = req.headers.authorization.split(" ").pop()
        const tokenData = await verifyToken(token)
        const userData = await Usuario.findById(tokenData._id)

        if([].concat(roles).includes(userData.role)) {
            next()
        } else {
            res.status(409)
            res.send({error: "No tienes permisos"})
        }
    }catch(error){
        return res.status(400).send({ error: error.message })
    }
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
    const fecha = new Date()
    const imageHuellitas = "https://lh3.googleusercontent.com/a/AEdFTp5y03Rs5TO_QAPI1GvXO0MXwrwxc5GnifUN53Xp=s96-c-rg-br100"
    if(!email || !password) return res.status(400).send({code: "EmptyLoginData", message: "Por favor introduce los datos necesarios"})
    
    try {
        const user = await Usuario.findOne({ where: { email } });
        const mail = mailer(email)
        const concaten = user + mail

        if (!user) return res.status(409).send({code: "UserNotFound", error: "Usuario o contraseña incorrectos" })

        const checkPassword = await compare(password, user.password);

        if (!checkPassword) return res.status(409).send({code: "InvalidPassword", error: "Usuario o contraseña incorrectos" })

        const token = await jwt.sign({id: user._id, role: user.role}, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        });
        
            await transporter.sendMail({
                from: '"Huellitas" <hdeamor2023@gmail.com>', // sender address
                to: email, // list of receivers
                subject: `Inicio de Sesión`, // Subject line
                html: `<!DOCTYPE html>
                <html>
                <body>
                <h1>Se acaba de registrar un inicio de sesion con su cuenta</h1>
                <h3>Fecha y hora: ${fecha}</h3>
                <h6>No responder a este mensaje</h6>
                <img src=${imageHuellitas} alt="Huellitas de amor">
                </body>
                </html>`, // html body
              });
        // console.log(email)
        return res.cookie({"token": token}).status(200).send(user)
    } catch (error) {
        console.log({error})
        return res.status(400).send({ error: error.message })
    }
}

const federatedLoginCtrl = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const { userData } = req.body;
    const fecha = new Date()
    const imageHuellitas = "https://lh3.googleusercontent.com/a/AEdFTp5y03Rs5TO_QAPI1GvXO0MXwrwxc5GnifUN53Xp=s96-c-rg-br100"

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
            await transporter.sendMail({
                from: '"Huellitas" <hdeamor2023@gmail.com>', // sender address
                to: userData.email, // list of receivers
                subject: `Inicio de Sesión`, // Subject line
                html: `<!DOCTYPE html>
                <html>
                <body>
                <h1>Se acaba de registrar un inicio de sesion con su cuenta</h1>
                <h3>Fecha y hora: ${fecha}</h3>
                <h6>No responder a este mensaje</h6>
                <img src=${imageHuellitas} alt="Huellitas de amor">
                </body>
                </html>`, // html body
              });
              console.log(userData.email)
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