const { Usuario } = require('../../db');
const bcrypt = require('bcryptjs');
const firebaseAdmin = require('../../config/firebase-config');
const { generateId } = require('../utils/utils');

const compare = async (passwordPlain, hashPassword) => {
    return await bcrypt.compare(passwordPlain, hashPassword)
}

const loginCtrl = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Usuario.findOne({ where: { email } });

        if (!user) return res.status(409).send({ error: "Usuario o contraseña incorrectos" })

        const checkPassword = await compare(password, user.password);
        // const tokenSession = await tokenSign(user);
        if (!checkPassword) return res.status(409).send({ error: "Usuario o contraseña incorrectos" })

        return res.status(200).send(user)
    } catch (error) {
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
                    work: false,
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



module.exports = {
    loginCtrl,
    federatedLoginCtrl
}