const {Op, Animal} = require("../../db")


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

const postAnimal = async (req, res) => {
    const {id, name, publication, species, age, weight, size, gender, race, description, image} = req.body;

    const createdAnimal = await Animal.create({
       id,
       name,
       publication,
       species,
       age,
       weight,
       size,
       gender,
       race,
       description,
       image,
    });

    try {
        res.status(200).send(createdAnimal)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
}

const deleteAnimal = async (req, res) => {
    try{
        const { id } = req.params
        await Animal.destroy({
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
    getAllAnimal,
    getDetail,
    postAnimal,
    deleteAnimal
}