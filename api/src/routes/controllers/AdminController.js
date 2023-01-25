const { Op } = require('sequelize');
const { Admin } = require('../../db');
const { generateId } = require("../utils/utils");
const bcryptjs = require('bcryptjs');

const getAllAdmins = async (req, res) => {
    const { name } = req.query;
    try {
        if (!name) {
            const allAdmin = await Admin.findAll();
            return res.send(allAdmin);
        } else {
            let users = await Admin.findAll({
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

const postAdmin = async (req, res) => {
    const { name, surname, email,  password } = req.body;

    const emailExist = await Admin.findOne({ where: { email } })

    if (emailExist) return res.status(409).send({ error: "El email ya está en uso" })

    const salt = await bcryptjs.genSalt(10);
    const encrypted = await bcryptjs.hash(password, salt);
    const newUser = await Admin.create({
        id: generateId(),
        name,
        surname,
        email,
        password: encrypted
    })

    try {
        res.status(200).send(newUser)
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}

const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params
        await Admin.destroy({
            where: {
                id
            }
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, surname, email} = req.body;

        const admin = await Admin.findByPk(id)
        admin.name = name || admin.name;
        admin.surname = surname || admin.surname;
        admin.email = email || admin.email;
        usuario.password = admin.password;
        await admin.save();

        res.json(admin)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getAdminById = async (req, res) => {
    const { admin_id } = req.params;

    try {
        const adminData = await Admin.findByPk(user_id);
        if(adminData){
            res.status(200).json(adminData);
        } else {
            return res.status(404).json({ message: error.message });
        }
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

//Admin cambia contraseña
const updateAdminPassword = async (req, res) => {
    const { id } = req.params
    const { password } = req.body;

    let admin = await Admin.findByPk(id);
    const salt = await bcryptjs.genSalt(10);
    const newPassword = await bcryptjs.hash(password, salt);

    if (!admin) return res.status(404).send('El Admin no existe');
    try {
        admin.password = newPassword;

        admin.name = admin.name;
        admin.surname = user.surname;
        admin.email = admin.email;
        await admin.save()
        res.status(200).send({ message: "Cambiado exitosamente" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = {
    getAllAdmins,
    postAdmin,
    deleteAdmin,
    updateAdmin,
    getAdminById,
    updateAdminPassword
}