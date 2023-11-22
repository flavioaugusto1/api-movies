const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");
const { hash, compare } = require("bcryptjs");

class UserControllers {
  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();

    if (!email) {
      throw new AppError("E-mail é obrigatório.");
    }

    const checkEmailExists = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (checkEmailExists) {
      throw new AppError("O e-mail informado já está cadastrado");
    }

    const hashedPassword = await hash(password, 8);

    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    const database = await sqliteConnection();

    const user = await database.get("SELECT * FROM users WHERE id = (?)", [
      user_id,
    ]);

    if (!user) {
      throw new AppError("O id informado não existe.");
    }

    const userWithUpdatedEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("O e-mail informado já está em uso");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError("Necessário informar a senha anterior.");
    }

    if (password && old_password) {
      const checkPassword = await compare(old_password, user.password);

      if (!checkPassword) {
        throw new AppError("A senha atual está incorreta.");
      }

      user.password = await hash(password, 8);
    }

    await database.run(
      `UPDATE users SET
    name = ?,
    email = ?,
    password = ?,
    updated_at = DATETIME('now')
    WHERE id = ?
    `,
      [user.name, user.email, user.password, user_id]
    );

    response.status(200).json();
  }
}

module.exports = UserControllers;
