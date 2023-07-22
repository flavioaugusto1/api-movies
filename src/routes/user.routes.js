const { Router } = require("express")

const UserControllers = require("../controllers/UserControllers")

const usersRouter = Router()

const userControllers = new UserControllers()

usersRouter.post("/", userControllers.create)
usersRouter.put("/:id", userControllers.update)

module.exports = usersRouter

