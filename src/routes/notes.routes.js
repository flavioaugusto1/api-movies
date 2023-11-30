const { Router } = require("express");

const NotesControllers = require("../controllers/NotesControllers");
const ensureAthenticated = require("../middlewares/ensureAthenticated");

const notesRouter = Router();

const notesControllers = new NotesControllers();

notesRouter.use(ensureAthenticated);

notesRouter.post("/", notesControllers.create);
notesRouter.get("/show/:id", notesControllers.show);
notesRouter.put("/update/:id", notesControllers.update);
notesRouter.delete("/delete/:id", notesControllers.delete);
notesRouter.get("/index", notesControllers.index);

module.exports = notesRouter;
