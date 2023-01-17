const { Op } = require('sequelize');
const { Animal } = require('../db');

const getAllAnimal = async (req, res) => {
    const { name } = req.query;
    try {
        if(!name){
            const allAnimal = await Animal.findAll();
            return res.send(allAnimal);
        }else{
            let animal = await Animal.findAll({
                where:{
                    name:{
                        [Op.like]:'%'+name+'%'
                    }
                }
            });
            if(!animal[0]){
                return res.status(404).json({error: 'No existe ese nombre'})
            }
            return res.send(animal);
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
}

const getDetail = async(req,res) => {
    const { id } = req.params;

    if(id){
        const animalId = await Animal.findOne({
            where: {
                id: id
            }
        });
        return res.send(animalId);
    }
}

module.exports = {
    getAllAnimal,
    getDetail
}