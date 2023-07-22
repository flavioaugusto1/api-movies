const { Router } = require("express")

const TagControllers = require("../controllers/TagControllers")

const tagsRouter = Router()

const tagControllers = new TagControllers()

tagsRouter.get("/index/:id", tagControllers.index)

module.exports = tagsRouter

