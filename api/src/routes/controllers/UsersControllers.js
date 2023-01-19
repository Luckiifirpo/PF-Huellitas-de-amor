const { Op } = require('sequelize');
const { Usuario, Animal } = require('../../db');
const {generateId} = require("../utils/utils"); 
const bcryptjs = require('bcryptjs');

const getAllUsers = async (req, res) => {
    const { name } = req.query;
    try {
        if(!name){
            const allUsers = await Usuario.findAll();
            return res.send(allUsers);
        }else{
            let users = await Usuario.findAll({
                where:{
                    name:{
                        [Op.like]:'%'+name+'%'
                    }
                }
            });
            if(!users[0]){
                return res.status(404).json({error: 'El Usuario no existe'})
            }
            return res.send(users);
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
}

const postUser = async (req, res) => {
    const { name, surname, age, direction, email, work, password} = req.body
    const salt = await bcryptjs.genSalt(10);
    const encrypted = await bcryptjs.hash(password, salt);
    const newUser = await Usuario.create({
        id: generateId(),
        name,
        surname,
        age,
        direction,
        email,
        work,
        password: encrypted
    })

    try {
        res.status(200).send(newUser)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
}

const deleteUser = async (req, res) => {
    try{
        const { id } = req.params
        await Usuario.destroy({
            where: {
                id
            }
        })
        res.sendStatus(204)
    } catch(error){ 
        return res.status(500).json({message: error.message})
    }
}

const updateUser = async (req, res) => {
    try{
        const { id } = req.params;
        const { name, surname, age, direction, email, work} = req.body;

        const usuario = await Usuario.findByPk(id)
        usuario.name = name || usuario.name;
        usuario.surname = surname || usuario.surname;
        usuario.age = age || usuario.age;
        usuario.direction = direction || usuario.direction;
        usuario.email = email || usuario.email;
        usuario.work = work || usuario.work;
        await usuario.save();

        res.json(usuario)
    } catch(error){
        return res.status(500).json({message: error.message})
    }
}

module.exports = {
    getAllUsers,
    postUser,
    deleteUser,
    updateUser
}