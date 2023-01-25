const { Router } = require('express');
const cookieParser = require("cookie-parser");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const animalRouter = require('./routers/routerAnimal');
const usersRouter = require('./routers/routerUsuario');
const authRouter = require("./routers/routerAuth");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/animals', animalRouter);
router.use('/users', usersRouter);
router.use("/auth", authRouter);

module.exports = router;
