const {Op, Animal, Usuario, Review} = require("../../db");
const {generateId} = require("../utils/utils")
const {generateDate} = require("../utils/utils") 
const { transporter } = require("../utils/mailer");

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
    try {
        if(id){
            const animalId = await Animal.findOne({
                where: {
                    id: id
                }
            });
            return res.send(animalId);
        }
    } catch (error) {
        res.status(400).send({error})
    }

}

const postAnimal = async (req, res) => {
    const { name, email, species, age, weight, size, gender, breed, description, image, ageTime} = req.body;
    const imageHuellitas = "https://lh3.googleusercontent.com/a/AEdFTp5y03Rs5TO_QAPI1GvXO0MXwrwxc5GnifUN53Xp=s96-c-rg-br100"
    const fecha = new Date()
    const petAgeTime = ageTime ? ageTime : "years";

    const createdAnimal = await Animal.create({
       id: generateId(),
       isAdopted: false,
       name,
       postDate: generateDate(),
       species,
       age,
       weight,
       size,
       gender,
       breed,
       description,
       image,
       ageTime: petAgeTime
    });

    try {
        await transporter.sendMail({
            from: '"Huellitas" <hdeamor2023@gmail.com>', // sender address
            to: email, // list of receivers
            subject: `Publicacion de mascota para dar en adopción`, // Subject line
            html: `<!DOCTYPE html>
            <html>
            <body>
            <h1>Hola, publicaste una nueva mascota!!!</h1>
            <h2>Le buscaremos un hogar a ${name}</h2>
            <img src = ${image} alt ="Mascota">
            <h4>Gracias por tu tiempo</h4>
            <h3>Fecha y hora de radicación del formulario: ${fecha}</h3>
            <h6>No responder a este mensaje</h6>
            <img src=${imageHuellitas} alt="Huellitas de amor">
            </body>
            </html>`, // html body
          });
          console.log(email);
        res.status(201).send(createdAnimal)
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

const updateAnimal = async (req, res) => {
    try{
        const { id } = req.params;
        const { name, date, species, age, weight, size, gender, breed, description, image, isAdopted} = req.body;

        const animal = await Animal.findByPk(id)
        animal.name = name || animal.name;
        animal.postDate = date || animal.postDate;
        animal.species = species || animal.species;
        animal.age = age || animal.age;
        animal.weight = weight || animal.weight;
        animal.size = size || animal.size;
        animal.gender = gender || animal.gender;
        animal.breed = breed || animal.breed;
        animal.description = description || animal.description;
        animal.image = image || animal.image;
        animal.isAdopted = isAdopted || animal.isAdopted
        await animal.save()

        res.json(await Animal.findAll());

    } catch(error){
        return res.status(500).json({message: error.message})
    }
}

const postReview = async(req, res) => {
    const animalId = req.params.id;
    const { userId, rate, description} = req.body;

    try {
        if(!userId || rate || description || animalId){
           res.status(400).send('Debes de completar todos los campos');
        }

       const review = await Review.create({
            rate: rate,
            description: description,
            animalId: animalId,
            userId: userId
        });

        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const putReview = async(req, res) => {
    const animalId = req.params.id;
    const reviewId = req.params.idreview;
    const { rate, description } = req.body;

    try {
        const review = await Review.update({
            rate: rate,
            description: description,           
        },{
            where : {
                id : reviewId,
                animalId: animalId
            }
        });

        res.status(200).json(review);
    } catch (error) {
       res.status(400).json({error: error.message});
    }


}

module.exports = {
    getAllAnimal,
    getDetail,
    postAnimal,
    deleteAnimal,
    updateAnimal,
    postReview,
    putReview
}