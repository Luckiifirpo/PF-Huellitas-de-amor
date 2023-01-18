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


module.exports = {
    getAllUsers,
    deleteUser
}