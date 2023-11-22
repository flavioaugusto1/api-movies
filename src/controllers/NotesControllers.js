const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class NotesControllers {
  async create(request, response) {
    const { title, description, rating, tags } = request.body;

    const user_id = request.user.id;

    const outRangeRating = rating > 5 || rating < 1;

    if (outRangeRating) {
      throw new AppError("Nota do filme deve ser entre 1 e 5");
    }

    const checkUserExists = await knex
      .select()
      .from("users")
      .where("id", user_id); // Retorna um array vazio caso não localize o usuário

    if (checkUserExists.length == 0) {
      throw new AppError("O usuário informado não existe");
    }

    const [note_id] = await knex("movieNotes").insert({
      title,
      description,
      rating,
      user_id,
    });

    const insertTags = tags.map((tag) => {
      return {
        note_id,
        user_id,
        name: tag,
      };
    });

    await knex("movieTags").insert(insertTags);

    response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const note = await knex("movieNotes").where({ id }).first();
    const tags = await knex("movieTags").where({ note_id: id }).orderBy("name");

    return response.json({
      ...note,
      tags,
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("movieNotes").where({ id }).delete();

    return response.json();
  }

  async index(request, response) {
    const { title, tags } = request.query;
    const user_id = request.user.id;

    let note;

    if (tags) {
      const filterTags = tags.split(",").map((tag) => tag.trim());

      note = await knex("movieTags")
        .select(["movieNotes.id", "movieNotes.title", "movieNotes.user_id"])
        .where("movieNotes.user_id", user_id)
        .whereLike("title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("movieNotes", "movieNotes.id", "movieTags.note_id")
        .orderBy("movieNotes.title");
    } else {
      note = await knex("movieNotes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }

    const userTags = await knex("movieTags").where({ user_id });
    const notesWithTags = note.map((note) => {
      const notesTags = userTags.filter((tag) => tag.note_id == note.id);

      return {
        ...note,
        tags: notesTags,
      };
    });
    response.json(notesWithTags);
  }
}

module.exports = NotesControllers;
