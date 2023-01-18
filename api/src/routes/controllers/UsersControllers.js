const { Op } = require('sequelize');
const { Usuario, Animal } = require('../../db');

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
    const {id, name, surname, age, direction, email, work} = req.body

    const newUser = await Usuario.create({
        id,
        name,
        surname,
        age,
        direction,
        email,
        work,
    })

    try {
        res.status(200).send(newUser)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
}

module.exports = {
    getAllUsers,
    postUser
}