const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const animalRouter = require('./routers/routerAnimal');
const usersRouter = require('./routers/routerUsuario');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/animals', animalRouter);
router.use('/users', usersRouter);

module.exports = router;
