const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const animalRouter = require('./routerAnimal');
const usersRouter = require('./routerUsuario');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/animal', animalRouter);
router.use('/users', usersRouter)

module.exports = router;
