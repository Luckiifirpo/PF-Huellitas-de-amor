const { Router } = require("express");
const { getAllAdmins,
    postAdmin,
    deleteAdmin,
    updateAdmin,
    getAdminById,
    updateAdminPassword} = require("../controllers/AdminController.js");


const usersRouter = Router();

usersRouter.get('/', getAllAdmins);

usersRouter.get('/:admin_id', getAdminById);

usersRouter.post("/", postAdmin)

usersRouter.delete("/:id", deleteAdmin)

usersRouter.put("/:id", updateAdmin)

usersRouter.put("/:id", updateAdminPassword)


module.exports = usersRouter;