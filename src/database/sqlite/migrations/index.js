const createUsers = require("./createUsers")
const sqliteConnection = require("../../sqlite")

async function migrationsRun() {
  const schema = [
    createUsers
  ].join('')

  sqliteConnection()
  .then(db => db.exec(schema))
  .catch(error => console.error(error))
}

module.exports = migrationsRun