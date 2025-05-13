import {Sequelize} from "sequelize";

export class Database {
  public connection: Sequelize;

  constructor() {
    this.connection = new Sequelize('database', 'username', 'password', {
      host: 'localhost',
      dialect: 'mysql',
      logging: false,
    });
  }

  getConnection() {
    return this.connection;
  }
}