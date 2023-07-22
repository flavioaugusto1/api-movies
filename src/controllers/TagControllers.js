const knex = require("../database/knex")

class TagsControllers {

  async index(request, response){
    const { id } = request.params

    const tags = await knex('movieTags').where({ id })

    return response.json(tags)

  }

}

module.exports = TagsControllers