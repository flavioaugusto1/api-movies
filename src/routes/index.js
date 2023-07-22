const { Router } = require("express")
const usersRouter = require("./user.routes")
const notesRouter = require("./notes.routes")
const tagsRouter = require("./tags.routes")

const route = Router()

route.use("/user", usersRouter)
route.use("/notes", notesRouter)
route.use("/tags", tagsRouter)

module.exports = route