const { Router } = require("express");

const UserControllers = require("../controllers/UserControllers");
const ensureAthenticated = require("../middlewares/ensureAthenticated");

const usersRouter = Router();

const userControllers = new UserControllers();

usersRouter.post("/", userControllers.create);
usersRouter.put("/update", ensureAthenticated, userControllers.update);

module.exports = usersRouter;
