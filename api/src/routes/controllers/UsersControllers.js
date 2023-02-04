const { Op, Sequelize } = require('sequelize');
const { Usuario, Animal, Review } = require('../../db');
const { generateId } = require("../utils/utils");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const { transporter } = require("../utils/mailer");


//const { transporter } = require('../utils/mailer');

const compare = async (passwordPlain, hashPassword) => {
    return await bcrypt.compare(passwordPlain, hashPassword)
}

const getAllUsers = async (req, res) => {
    const { name } = req.query;
    try {
        if (!name) {
            const allUsers = await Usuario.findAll();
            return res.send(allUsers);
        } else {
            let users = await Usuario.findAll({
                where: {
                    name: {
                        [Op.like]: '%' + name + '%'
                    }
                }
            });
            if (!users[0]) {
                return res.status(404).json({ error: 'El Usuario no existe' })
            }
            return res.send(users);
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
}

const postUser = async (req, res) => {
    const { name, surname, age, direction, email, hasAJob, occupation, password } = req.body;
    const fecha = new Date()
    const imageHuellitas = "https://lh3.googleusercontent.com/a/AEdFTp5y03Rs5TO_QAPI1GvXO0MXwrwxc5GnifUN53Xp=s96-c-rg-br100"
    const emailExist = await Usuario.findOne({ where: { email } })

    if (emailExist) return res.status(409).send({ code: "EmailAlreadyExist", error: "El email ya está en uso" });

    const salt = await bcrypt.genSalt(10);
    const encrypted = await bcrypt.hash(password, salt);
    const newUser = await Usuario.create({
        id: generateId(),
        name,
        surname,
        age,
        direction,
        email,
        hasAJob,
        occupation: "",
        password: encrypted
    })

    const token = await jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
    await transporter.sendMail({
        from: '"Huellitas" <hdeamor2023@gmail.com>', // sender address
        to: email, // list of receivers
        subject: `Nueva cuenta en Huellitas`, // Subject line
        html: `<!DOCTYPE html>
        <html>
        <body>
        <h1>Gracias ${name} ${surname} por unirte a Huellitas de amor</h1>
        <h1>Nos emociona tenerte con nosotros!</h1>
        <h1>Seguro te va a encantar!!!</h1>
        <h3>Fecha y hora del registro: ${fecha}</h3>
        <h6>No responder a este mensaje</h6>
        <img src=${imageHuellitas} alt="Huellitas de amor">
        </body>
        </html>`, // html body
      });
    //   console.log(email)
    try {
        res.cookie({ "token": token }).status(200).send(newUser)
    } catch (error) {
        console.log(error.message)
        res.status(400).send({ error: error.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        await Usuario.destroy({
            where: {
                id
            }
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, surname, age, direction, email, hasAJob, occupation, photoURL } = req.body;

        const usuario = await Usuario.findByPk(id)
        usuario.name = name || usuario.name;
        usuario.surname = surname || usuario.surname;
        usuario.age = age || usuario.age;
        usuario.direction = direction || usuario.direction;
        usuario.email = email || usuario.email;
        usuario.hasAJob = hasAJob || usuario.hasAJob;
        usuario.occupation = occupation || usuario.occupation;
        usuario.password = usuario.password;
        usuario.photoURL = photoURL || usuario.photoURL
        await usuario.save();

        res.json(usuario)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
}

const getUserById = async (req, res) => {
    const { user_id } = req.params;

    try {
        const userData = await Usuario.findByPk(user_id);
        if (userData) {
            res.status(200).json(userData);
        } else {
            return res.status(404).json({ message: error.message });
        }
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

//Usuario cambia contraseña
const updatePasswordUser = async (req, res) => {
    const { id } = req.params
    const { oldPassword, newPassword, repeatedNewPassword } = req.body;

    let user = await Usuario.findByPk(id);
    const salt = await bcrypt.genSalt(10);
    const newEncryptedPassword = await bcrypt.hash(newPassword, salt);

    if (!user) return res.status(404).send('El Usuario no existe');

    const matchOldPassword = await compare(oldPassword, user.password);

    if (!matchOldPassword) return res.status(403).send({ code: "OldPasswordNotMatch", message: 'La contraseña anterior no coincide con la que tienes registrada' });

    if (newPassword !== repeatedNewPassword) {
        return res.status(403).send({ code: "RepeatedPasswordNotMatch", message: 'La contraseñas no coinciden' });
    }

    try {
        user.password = newEncryptedPassword;

        user.name = user.name;
        user.surname = user.surname;
        user.age = user.age;
        user.direction = user.direction;
        user.email = user.email;
        user.hasAJob = user.hasAJob;
        user.occupation = user.occupation
        await user.save()
        res.status(200).send({ message: "Cambiado exitosamente" });
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message });

    }

}

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(409).send({code: "EmailIsRequerid", message: "email es requerido"});

    const user = await Usuario.findOne({
        where: {
            email: email
        }
    });

    if (!user) return res.status(409).send({code: 'UserNotFound', error: 'Usuario no esta registrado'});

    try {

        const reset1 = generateId();
        user.setDataValue("reset", reset1);
        user.save();

        let transporter = await nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAILER_EMAIL,
                pass: process.env.MAILER_PASS,
            }
        })
        await transporter.sendMail({
            from: process.env.MAILER_EMAIL, // sender address
            to: user.email,
            subject: "Cambiar tu contraseña", // Subject line
            text: "Parece que has olvidado tu contraseña!", // plain text body
            html: `
            <h2>Por favor has click en el siguiente enlace para restablecer la contraseña</h2>
            <p>${process.env.CLIENT_URL}/reset-password/${user.dataValues.reset}</p>
            `, // html body
        });

        res.status(200).send("email enviado")
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

const resetpassword = async (req, res) => {
    const { id } = req.params;
    const { newPassword, newPassword2 } = req.body;
    const imageHuellitas = "https://lh3.googleusercontent.com/a/AEdFTp5y03Rs5TO_QAPI1GvXO0MXwrwxc5GnifUN53Xp=s96-c-rg-br100"
  const fecha = new Date()
    // console.log(reset);
    // console.log(newPassword);
    if (!newPassword || !newPassword2) {
        return res.status(409).send({code: 'PasswordIsRequerid', message: "debe ingresar una nueva contraseña que coincidan en Ambos campos"});
    }

    if(newPassword !== newPassword2) {
        return res.status(409).send({code: 'PasswordNotMatch', message: "Las contraseñas no coinciden"});
    }
    // const email = await Usuario.findAll({where:{id:id}})
    // console.log(id)
    
    const user = await Usuario.findOne({ where: { reset: id } });
    const email=user.dataValues.email;

    // console.log(email)
    if (!user) {
        return res.status(400).json({ error: "User with this token does not existe" });
    }
    const token = await jwt.sign({ id: user._id }, process.env.RESET_PASSWORD_KEY, {
        expiresIn: '20m',
    });
    await transporter.sendMail({
        from: '"Huellitas" <hdeamor2023@gmail.com>', // sender address
        to: email, // list of receivers
        subject: `Restablecimiento de contraseña`, // Subject line
        html: `<!DOCTYPE html>
        <html>
        <body>
        <h1>Se acaba de registrar el cambio de su contraseña</h1>
        <h3>Fecha y hora: ${fecha}</h3>
        <h6>No responder a este mensaje</h6>
        <img src=${imageHuellitas} alt="Huellitas de amor">
        </body>
        </html>`, // html body
      });
    try {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(newPassword, salt);
        user.update({
            password: password
        }
        );
        res.cookie({ "token": token }).status(200).send("contraseña cambiada");

    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

//ruta que muestra todas las review de un user
const getReview = async(req, res) => {
    const { id } = req.params;

   try {
        const review = await Review.findAll({
            where: {
                userId: id
            },
            include: [{model: Animal}]
        });

        res.status(200).json(review);
   } catch (error) {
        res.status(400).json({error: error.message});
   }
}

module.exports = {
    getAllUsers,
    postUser,
    deleteUser,
    updateUser,
    getUserById,
    updatePasswordUser,
    forgotPassword, 
    resetpassword,
    getReview

}