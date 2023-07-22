const { Router } = require("express")

const NotesControllers = require("../controllers/NotesControllers")

const notesRouter = Router()

const notesControllers = new NotesControllers()

notesRouter.post("/:user_id", notesControllers.create)
notesRouter.get("/show/:id", notesControllers.show)
notesRouter.delete("/delete/:id", notesControllers.delete)
notesRouter.get("/index", notesControllers.index)

module.exports = notesRouter

