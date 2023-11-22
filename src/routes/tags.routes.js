const { Router } = require("express");

const TagControllers = require("../controllers/TagControllers");
const ensureAthenticated = require("../middlewares/ensureAthenticated");

const tagsRouter = Router();

const tagControllers = new TagControllers();

tagsRouter.get("/", ensureAthenticated, tagControllers.index);

module.exports = tagsRouter;
