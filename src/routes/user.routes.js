const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const UserControllers = require("../controllers/UserControllers");
const UserAvatarController = require("../controllers/UserAvatarController");
const ensureAthenticated = require("../middlewares/ensureAthenticated");

const usersRouter = Router();
const upload = multer(uploadConfig.MULTER);

const userControllers = new UserControllers();
const userAvatarController = new UserAvatarController();

usersRouter.post("/", userControllers.create);
usersRouter.put("/update", ensureAthenticated, userControllers.update);
usersRouter.patch("/avatar", ensureAthenticated, upload.single("avatar"), userAvatarController.update);

module.exports = usersRouter;
