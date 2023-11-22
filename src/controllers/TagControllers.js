const knex = require("../database/knex");

class TagsControllers {
  async index(request, response) {
    const user_id = request.user.id;

    const tags = await knex("movieTags").where({ user_id });

    return response.json(tags);
  }
}

module.exports = TagsControllers;