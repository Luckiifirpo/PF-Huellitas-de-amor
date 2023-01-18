const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const animalsRouter = require("./routes/animals-route");
const animalRouter = require('./routerAnimal');
const usersRouter = require('./routerUsuario');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/animals", animalsRouter);
router.use('/animal', animalRouter);
router.use('/users', usersRouter);

module.exports = router;
